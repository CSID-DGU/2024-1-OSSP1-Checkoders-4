package zxcv.asdf.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import zxcv.asdf.domain.Chatting;
import zxcv.asdf.DTO.page6_chat;
import zxcv.asdf.domain.User;
import zxcv.asdf.repository.ChattingRepository;
import zxcv.asdf.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ChattingService {

    @Autowired
    private ChattingRepository chattingRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Chatting> getAllChats() {
        return chattingRepository.findAll();
    }

    public Optional<Chatting> getChatById(Long id) {
        return chattingRepository.findById(id);
    }

    public List<Chatting> getChatsBySenderToken(String senderToken) {
        return chattingRepository.findBySenderToken(senderToken);
    }

    public List<Chatting> getChatsByReceiverToken(String receiverToken) {
        return chattingRepository.findByReceiverToken(receiverToken);
    }

    public List<Chatting> getChatsBetweenUsers(String senderToken, String receiverToken) {
        return chattingRepository.findBySenderTokenAndReceiverToken(senderToken, receiverToken);
    }

    public Chatting saveChat(page6_chat chatDto) {
        User sender = userRepository.findByToken(chatDto.getSenderToken())
                .orElseThrow(() -> new IllegalArgumentException("Sender not found"));
        User receiver = userRepository.findByToken(chatDto.getReceiverToken())
                .orElseThrow(() -> new IllegalArgumentException("Receiver not found"));

        Chatting chatting = Chatting.builder()
                .sender(sender)
                .receiver(receiver)
                .content(chatDto.getContent())
                .timestamp(chatDto.getTimestamp())
                .build();
        return chattingRepository.save(chatting);
    }

    public void deleteChat(Long id) {
        chattingRepository.deleteById(id);
    }
}
