package com.example.AllEat.controller;

import com.example.AllEat.service.MainDataService;
import com.example.AllEat.service.DetailDataService;
import com.example.AllEat.dto.menu.MainDataDTO;
import com.example.AllEat.dto.DetailDataDTO; // DetailDataDTO 임포트 추가
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DataController {

    @Autowired
    private MainDataService mainDataService;

    @Autowired
    private DetailDataService detailDataService;

    @GetMapping("/AllEat/get/main/{date}")
    public MainDataDTO getMainData(@PathVariable("date") String date) {
        return mainDataService.getDiaryByDate(date);
    }

    @GetMapping("/AllEat/get/detail/{diary_id}")
    public List<DetailDataDTO> getDiaryDetails(@PathVariable("diary_id") Integer diaryId) {
        // DetailDataService를 통해 diaryId에 해당하는 메뉴들을 가져온다.
        return detailDataService.getMenusByDiaryId(diaryId);
    }
}
