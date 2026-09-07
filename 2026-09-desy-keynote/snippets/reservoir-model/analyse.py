"""Analyse an illustrative reservoir, not a Deltares production model."""

import csv
import io
import math
import subprocess


def main() -> None:
    result = subprocess.run(
        ["reservoir-model"], check=True, capture_output=True, text=True
    )
    samples: list[tuple[float, float]] = [
        (float(row["time"]), float(row["volume"]))
        for row in csv.DictReader(io.StringIO(result.stdout))
    ]
    if len(samples) != 11 or any(
        time != step or not math.isclose(volume, 100.0 * 0.9**step, rel_tol=1e-12)
        for step, (time, volume) in enumerate(samples)
    ):
        raise ValueError("Reservoir output does not match ten Euler steps")

    print("Illustrative linear reservoir (Euler, 10 steps)")
    print(f"Volume: {samples[0][1]:.8f} -> {samples[-1][1]:.8f}")
    print("Validated 11 samples from reservoir-model on PATH.")


if __name__ == "__main__":
    main()
