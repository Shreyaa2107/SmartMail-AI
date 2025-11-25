package com.email.writer.app;

import org.springframework.stereotype.Service;

@Service
public class EmailPriorityService {

    // Local lightweight keyword-based classification
    public String classify(String subject, String snippet, String sender) {
        String text = (subject + " " + snippet).toLowerCase();

        if (contains(text, "urgent", "immediately", "asap", "last date", "final reminder",
                "deadline", "payment", "interview", "offer", "action required","react", "job", "notice", "internship")) {
            return "HIGH";
        }

        if (contains(text, "schedule", "meeting", "update", "follow up", "status",
                "invoice", "assignment", "submission", "review", "notice")) {
            return "MEDIUM";
        }

        return "LOW";
    }

    private boolean contains(String text, String... words) {
        for (String w : words)
            if (text.contains(w)) return true;
        return false;
    }
}
