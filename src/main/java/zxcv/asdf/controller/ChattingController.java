package zxcv.asdf.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zxcv.asdf.domain.Chatting;
import zxcv.asdf.DTO.page6_chat;
import zxcv.asdf.service.ChattingService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/chat")
public class ChattingController {

    @Autowired
    private ChattingService chattingService;

    @GetMapping
    public List<Chatting> getAllChats() {
        return chattingService.getAllChats();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Chatting> getChatById(@PathVariable Long id) {
        Optional<Chatting> chatting = chattingService.getChatById(id);
        return chatting.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/sender/{senderToken}")
    public List<Chatting> getChatsBySenderToken(@PathVariable String senderToken) {
        return chattingService.getChatsBySenderToken(senderToken);
    }

    @GetMapping("/receiver/{receiverToken}")
    public List<Chatting> getChatsByReceiverToken(@PathVariable String receiverToken) {
        return chattingService.getChatsByReceiverToken(receiverToken);
    }

    @GetMapping("/between/{senderToken}/{receiverToken}")
    public List<Chatting> getChatsBetweenUsers(@PathVariable String senderToken, @PathVariable String receiverToken) {
        return chattingService.getChatsBetweenUsers(senderToken, receiverToken);
    }

    @PostMapping
    public Chatting saveChat(@RequestBody page6_chat chatDto) {
        return chattingService.saveChat(chatDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChat(@PathVariable Long id) {
        chattingService.deleteChat(id);
        return ResponseEntity.noContent().build();
    }
}
