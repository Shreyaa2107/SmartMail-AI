package com.email.writer.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/gmail")
@CrossOrigin(origins = "*")
public class GmailPriorityController {

    @Autowired
    private EmailPriorityService priorityService;

    @PostMapping("/prioritize")
    public List<PriorityResponse> prioritize(@RequestBody List<EmailData> emails) {

        List<PriorityResponse> result = new ArrayList<>();

        for (EmailData email : emails) {
            String label = priorityService.classify(
                    email.getSubject(),
                    email.getSnippet(),
                    email.getFrom()
            );
            result.add(new PriorityResponse(label));
        }

        return result;
    }
}
