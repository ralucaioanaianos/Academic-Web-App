package com.example.AcademicWebApp.Utils;

import org.springframework.security.crypto.bcrypt.BCrypt;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Base64;

public class Utils {
    private static SecretKeySpec secretKey;
    private static byte[] key;
    private static int workload = 12;
    private static final String secret = "SomeSecretKey";

    public static String hashPassword(String password_plaintext) {
        String salt = BCrypt.gensalt(workload);
        String hashed_password = BCrypt.hashpw(password_plaintext, salt);

        return(hashed_password);
    }

    public static boolean verifyHash(String password, String hash) {
        return BCrypt.checkpw(password, hash);
    }

    public static String decrypt(String ciphertext) throws Exception {
        SecretKey secretKey = getSecretKey("o9szYIOq1rRMiouNhNvaq96lqUvCekxR");
        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        cipher.init(Cipher.DECRYPT_MODE, secretKey);
        return new String(cipher.doFinal(Base64.getDecoder().decode(ciphertext)));
    }

    public static SecretKey getSecretKey(String secretKey) throws Exception {
        byte[] decodeSecretKey = Base64.getDecoder().decode(secretKey);
        return new SecretKeySpec(decodeSecretKey, 0, decodeSecretKey.length, "AES");
    }
}



