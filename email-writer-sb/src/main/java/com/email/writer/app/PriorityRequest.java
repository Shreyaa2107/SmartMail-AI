package com.email.writer.app;

import lombok.Data;

@Data
public class PriorityRequest {
    private String subject;
    private String snippet;
    private String from;
}
