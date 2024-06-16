package zxcv.asdf.DTO;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class page6_chat {

    private String senderToken;

    private String receiverToken;

    private String content;

    private LocalDateTime timestamp;
}
