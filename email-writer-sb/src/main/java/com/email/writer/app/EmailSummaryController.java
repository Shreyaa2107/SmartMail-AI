package com.email.writer.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = {"chrome-extension://*", "*"})
public class EmailSummaryController {

    @Autowired
    private EmailSummaryService summaryService;

    @PostMapping("/summarize")
    public String summarizeEmail(@RequestBody SummaryRequest request) {
        return summaryService.summarize(request.getEmailContent());
    }
}
