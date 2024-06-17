package zxcv.asdf.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class page6_chat {
    private String senderToken;
    private String senderName;
    private Long teamId;
    private Long answerId;
    private String content;
    private LocalDateTime timestamp;
}
