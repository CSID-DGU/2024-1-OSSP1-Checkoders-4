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

    @GetMapping("/team/{teamId}/answer/{answerId}")
    public List<Chatting> getChatsByTeamAndAnswer(@PathVariable Long teamId, @PathVariable Long answerId) {
        return chattingService.getChatsByTeamAndAnswer(teamId, answerId);
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
