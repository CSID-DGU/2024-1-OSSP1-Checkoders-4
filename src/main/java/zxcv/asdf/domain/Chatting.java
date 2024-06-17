package zxcv.asdf.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Chatting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sender_token", referencedColumnName = "token", nullable = false)
    private User sender;

    @ManyToOne
    @JoinColumn(name = "team_id", referencedColumnName = "id", nullable = false)
    private Team team;

    @ManyToOne
    @JoinColumn(name = "answer_id", referencedColumnName = "id", nullable = false)
    private Answer answer;

    private String content;

    private LocalDateTime timestamp;
}