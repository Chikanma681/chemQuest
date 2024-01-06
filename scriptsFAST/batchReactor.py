import numpy as np
from scipy.integrate import odeint
import matplotlib.pyplot as plt


def dydx(C, t, k1):
    dCAdt = -k1 * C[0] * C[1]
    dCBdt = -k1 * C[0] * C[1]
    dCCdt = k1 * C[1]
    return [dCAdt, dCBdt, dCCdt]


def calculateBatch(C:list, k1, t_end, desired_time):
    # Other parameters for integration
    Co = C  # Initial conditions
    tspan = np.linspace(0, t_end, 1000)  # Time ranges from 0 to t_end

    # Solve the differential equations using odeint
    C = odeint(dydx, Co, tspan, args=(k1,))

    # Plot the results
    plt.plot(tspan, C[:, 0], 'r--', label='CA')
    plt.plot(tspan, C[:, 1], '-', label='CB')
    plt.plot(tspan, C[:, 2], '.', label='CC')
    plt.legend()
    plt.xlabel('Time')
    plt.ylabel('Concentration')
    plt.title(f'Concentration vs Time (k1={k1})')
    plt.grid(True)
    
    # Set x-axis and y-axis limits to start at 0.0
    plt.xlim(left=0)
    plt.ylim(bottom=0)
    
    # Find index closest to the desired_time in tspan
    idx = np.abs(tspan - desired_time).argmin()
    concentrations_at_time = C[idx]
    # Conversion
    Xa = 1-((concentrations_at_time[0])/(Co[0]))

    print(f"At time {desired_time}, the conversion of A is: Xa = {Xa}")
    print(f'Concentrations at time {desired_time}: CA={concentrations_at_time[0]}, CB={concentrations_at_time[1]}, CC={concentrations_at_time[2]}')
    
    plt.show()


calculateBatch([5, 3, 0], 0.4, 15, 10)  # Example: find concentrations at time t=10
