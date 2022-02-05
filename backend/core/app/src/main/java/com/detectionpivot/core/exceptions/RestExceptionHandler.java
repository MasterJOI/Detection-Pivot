package com.detectionpivot.core.exceptions;

import com.detectionpivot.core.exceptions.custom.IdNotFoundException;
import com.detectionpivot.core.sniffer.SnifferException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.NoSuchElementException;

@RestControllerAdvice
@Slf4j
public class RestExceptionHandler extends AbstractExceptionHandler {

	@ExceptionHandler(ResponseStatusException.class)
	public ApiError handleResponseStatusException(ResponseStatusException exception, HttpServletRequest request, HttpServletResponse response) {
		return setResponseStatusAndReturnError(exception, exception.getReason(), exception.getStatus(), request, response);
	}

	@ExceptionHandler(NoSuchElementException.class)
	public ApiError handleEntityNotFound(NoSuchElementException exception, HttpServletRequest request, HttpServletResponse response) {
		return setResponseStatusAndReturnError(exception, "entity-not-found", HttpStatus.NOT_FOUND, request, response);
	}

	@ExceptionHandler(IdNotFoundException.class)
	public ApiError handleIdNotFoundException(IdNotFoundException exception, HttpServletRequest request,
											  HttpServletResponse response) {
		return setResponseStatusAndReturnError(exception, "id-not-found", HttpStatus.NOT_FOUND, request, response);
	}

	@ExceptionHandler(SnifferException.class)
	public ApiError handleSnifferException(SnifferException exception, HttpServletRequest request,
									   HttpServletResponse response) {
		return setResponseStatusAndReturnError(exception, exception.getCode(), HttpStatus.INTERNAL_SERVER_ERROR, request,
			response);
	}

	@ExceptionHandler(Exception.class)
	public ApiError handleAll(Exception exception, HttpServletRequest request, HttpServletResponse response) {
		log.error("Unhandled error", exception);
		return setResponseStatusAndReturnError(exception, "internal-error", HttpStatus.INTERNAL_SERVER_ERROR, request, response);
	}
}
