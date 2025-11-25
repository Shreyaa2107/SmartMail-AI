package com.email.writer.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gmail")
@CrossOrigin(origins = "*")
public class FetchEmailsController {

    @Autowired
    private GmailService gmailService;

    @PostMapping("/fetch")
    public List<EmailData> fetchEmails(@RequestBody String accessToken) {
        return gmailService.fetchEmails(accessToken);
    }
}
