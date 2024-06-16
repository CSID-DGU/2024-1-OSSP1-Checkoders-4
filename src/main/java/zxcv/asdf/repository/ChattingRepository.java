package zxcv.asdf.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import zxcv.asdf.domain.Chatting;

import java.util.List;

public interface ChattingRepository extends JpaRepository<Chatting, Long> {
    List<Chatting> findBySenderToken(String senderToken);
    List<Chatting> findByTeamIdAndAnswerId(Long teamId, Long answerId);
}
