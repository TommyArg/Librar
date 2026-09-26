package com.dsf.librar.service;

import org.springframework.web.multipart.MultipartFile;

public interface ProductService {
    void importExcel(MultipartFile file);
}