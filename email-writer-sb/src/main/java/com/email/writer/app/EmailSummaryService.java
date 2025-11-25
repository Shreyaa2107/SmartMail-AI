package com.email.writer.app;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class EmailSummaryService {

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private final ObjectMapper mapper = new ObjectMapper();

    public String summarize(String emailContent) {
        try {
            String prompt = "Summarize the following email in 3-4 short, clear sentences:\n\n" + emailContent;
            prompt = prompt.replace("\"", "\\\"");

            String requestBody = """
                {
                  "contents": [
                    {
                      "role": "user",
                      "parts": [
                        { "text": "%s" }
                      ]
                    }
                  ]
                }
                """.formatted(prompt);

            WebClient client = WebClient.builder()
                    .defaultHeader("Content-Type", "application/json")
                    .defaultHeader("x-goog-api-key", geminiApiKey)
                    .build();

            Mono<String> response = client.post()
                    .uri(geminiApiUrl)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class);

            String result = response.block();

            // ✅ Use JSON parser to extract generated text
            JsonNode root = mapper.readTree(result);
            JsonNode textNode = root
                    .path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text");

            if (textNode.isMissingNode() || textNode.asText().isEmpty()) {
                return "No summary text found.";
            }

            return textNode.asText().trim();

        } catch (Exception e) {
            e.printStackTrace();
            return "Error summarizing email: " + e.getMessage();
        }
    }
}
