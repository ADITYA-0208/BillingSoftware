package in.adityakhanna.billingsoftware.service;

import in.adityakhanna.billingsoftware.io.UserRequest;
import in.adityakhanna.billingsoftware.io.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse createUser(UserRequest request);

    String getUserRole(String email);

    List<UserResponse> readUsers();

    void deleteUser(String id);
}
