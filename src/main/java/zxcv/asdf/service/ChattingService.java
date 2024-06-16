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
import java.util.stream.Collectors;

@Service
public class ChattingService {

    @Autowired
    private ChattingRepository chattingRepository;

    @Autowired
    private UserRepository userRepository;

    public List<page6_chat> getAllChats() {
        return chattingRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public Optional<page6_chat> getChatById(Long id) {
        return chattingRepository.findById(id).map(this::convertToDTO);
    }

    public List<page6_chat> getChatsBySenderToken(String senderToken) {
        return chattingRepository.findBySenderToken(senderToken).stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<page6_chat> getChatsByReceiverToken(String receiverToken) {
        return chattingRepository.findByReceiverToken(receiverToken).stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<page6_chat> getChatsBetweenUsers(String senderToken, String receiverToken) {
        return chattingRepository.findBySenderTokenAndReceiverToken(senderToken, receiverToken).stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public page6_chat saveChat(page6_chat chatDto) {
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
        Chatting savedChat = chattingRepository.save(chatting);
        return convertToDTO(savedChat);
    }

    public void deleteChat(Long id) {
        chattingRepository.deleteById(id);
    }

    private page6_chat convertToDTO(Chatting chatting) {
        return page6_chat.builder()
                .senderToken(chatting.getSender().getToken())
                .receiverToken(chatting.getReceiver().getToken())
                .content(chatting.getContent())
                .timestamp(chatting.getTimestamp())
                .build();
    }
}
