package zxcv.asdf.DTO;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class page6_chat {

    private String senderToken;
    private Long teamId;
    private Long answerId;
    private String content;
    private LocalDateTime timestamp;
}
