package com.email.writer.app;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class GmailService {

    private final String GMAIL_API = "https://gmail.googleapis.com/gmail/v1/users/me/messages";

    public List<EmailData> fetchEmails(String accessToken) {

        RestTemplate rest = new RestTemplate();

        // Step 1 → get list of message IDs
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<Void> request = new HttpEntity<>(headers);

        ResponseEntity<Map> response = rest.exchange(
                GMAIL_API,
                HttpMethod.GET,
                request,
                Map.class
        );

        List<Map<String, String>> messages = (List<Map<String, String>>) response.getBody().get("messages");
        if (messages == null) return Collections.emptyList();

        List<EmailData> result = new ArrayList<>();

        // Step 2 → fetch each email by ID
        for (int i = 0; i < Math.min(messages.size(), 25); i++) {
            String id = messages.get(i).get("id");

            ResponseEntity<Map> msgResponse = rest.exchange(
                    GMAIL_API + "/" + id + "?format=metadata",
                    HttpMethod.GET,
                    request,
                    Map.class
            );

            Map msg = msgResponse.getBody();

            String snippet = (String) msg.get("snippet");
            List<Map<String, String>> headersList =
                    (List<Map<String, String>>) ((Map) msg.get("payload")).get("headers");

            String from = "";
            String subject = "";

            for (Map<String, String> header : headersList) {
                if ("From".equalsIgnoreCase(header.get("name"))) from = header.get("value");
                if ("Subject".equalsIgnoreCase(header.get("name"))) subject = header.get("value");
            }

            result.add(new EmailData(subject, snippet, from));
        }

        return result;
    }
}
