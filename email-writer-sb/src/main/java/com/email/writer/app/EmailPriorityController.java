package com.email.writer.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = {"chrome-extension://*", "*"})
public class EmailPriorityController {

    @Autowired
    private  EmailPriorityService priorityService;

    @GetMapping("/hi")
    public String PrintHi(){
        return "hi headphone lelo";
    }
    @PostMapping("/priority")
    public PriorityResponse getPriority(@RequestBody PriorityRequest request) {
        String label = priorityService.classify(request.getSubject(), request.getSnippet(), request.getFrom());
        return new PriorityResponse(label);
    }
}
