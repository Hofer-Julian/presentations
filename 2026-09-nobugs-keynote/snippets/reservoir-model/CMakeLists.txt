cmake_minimum_required(VERSION 3.20)
project(reservoir-model LANGUAGES CXX)

add_executable(reservoir-model reservoir.cpp)
target_compile_features(reservoir-model PRIVATE cxx_std_17)
install(TARGETS reservoir-model RUNTIME DESTINATION bin)
