package com.email.writer.app;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.net.URI;

@RestController
@RequestMapping("/api/gmail")
@CrossOrigin(origins = "*")
public class GmailAuthController {

    @Value("${google.client.id}")
    private String clientId;

    @Value("${google.client.secret}")
    private String clientSecret;

    @Value("${google.redirect.uri}")
    private String redirectUri;

    private final String FRONTEND_URL = "http://localhost:3000";

    private final String SCOPE =
            "https://www.googleapis.com/auth/gmail.readonly "
                    + "https://www.googleapis.com/auth/userinfo.email";

    // STEP 1 → Generate Google Login URL
    @GetMapping("/login")
    public String login() {
        System.out.println("🔥 USING REDIRECT URI: " + redirectUri);

        return "https://accounts.google.com/o/oauth2/v2/auth"
                + "?client_id=" + clientId
                + "&redirect_uri=" + redirectUri
                + "&response_type=code"
                + "&scope=" + SCOPE
                + "&access_type=offline"
                + "&prompt=consent";
    }

    // STEP 2 → Google sends ?code=xxxx here
    @GetMapping("/callback")
    public ResponseEntity<?> callback(@RequestParam("code") String code) {

        System.out.println("🔥 Received code: " + code);

        // EXCHANGE CODE FOR TOKEN
        String tokenUrl = "https://oauth2.googleapis.com/token";

        WebClient client = WebClient.create();

        GoogleTokenResponse tokenResponse = client.post()
                .uri(tokenUrl)
                .bodyValue(
                        "code=" + code +
                                "&client_id=" + clientId +
                                "&client_secret=" + clientSecret +
                                "&redirect_uri=" + redirectUri +
                                "&grant_type=authorization_code"
                )
                .header("Content-Type", "application/x-www-form-urlencoded")
                .retrieve()
                .bodyToMono(GoogleTokenResponse.class)
                .block();

        System.out.println("🔥 TOKEN RESPONSE: " + tokenResponse.getAccess_token());

        // STEP 3 → REDIRECT FRONTEND WITH TOKEN
        URI redirect = URI.create(FRONTEND_URL + "/?access_token=" + tokenResponse.getAccess_token());

        return ResponseEntity.status(HttpStatus.FOUND)
                .location(redirect)
                .build();
    }

    // DTO for token response
    static class GoogleTokenResponse {
        private String access_token;

        public String getAccess_token() {
            return access_token;
        }

        public void setAccess_token(String access_token) {
            this.access_token = access_token;
        }
    }
}
