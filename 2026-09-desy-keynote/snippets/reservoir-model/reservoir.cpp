#include <iomanip>
#include <iostream>
#include <limits>

int main() {
    // Illustrative linear reservoir: dV/dt = -kV, discretised with Euler.
    constexpr double k = 0.1;
    constexpr double dt = 1.0;
    constexpr int steps = 10;
    double volume = 100.0;

    std::cout << std::setprecision(std::numeric_limits<double>::max_digits10);
    std::cout << "time,volume\n0," << volume << '\n';
    for (int step = 1; step <= steps; ++step) {
        volume *= 1.0 - k * dt;
        std::cout << step * dt << ',' << volume << '\n';
    }
}
