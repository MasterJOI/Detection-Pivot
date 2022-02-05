package com.detectionpivot.core.domains.interfaces;

import com.detectionpivot.core.domains.interfaces.dto.InterfaceDataDto;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("interfaces")
@Validated
public class InterfacesController {
	private final InterfacesService interfacesService;

	public InterfacesController(InterfacesService interfacesService) {
		this.interfacesService = interfacesService;
	}

	@GetMapping("/all")
	public List<InterfaceDataDto> getAllInterfaces() {
		return interfacesService.getAllInterfaces();
	}
}
