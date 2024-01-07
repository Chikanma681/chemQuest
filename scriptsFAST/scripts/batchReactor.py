import cloudinary.uploader
import cloudinary.api
import matplotlib
matplotlib.use('Agg')  # Set backend for non-interactive plotting
import numpy as np
from scipy.integrate import odeint
import matplotlib.pyplot as plt

# Define the dy/dx function used in your simulation
def dydx(C, t, k1):
    dCAdt = -k1 * C[0] * C[1]
    dCBdt = -k1 * C[0] * C[1]
    dCCdt = k1 * C[1]
    return [dCAdt, dCBdt, dCCdt]

def calculateBatch(C: list, k1, t_end, desired_time):
    Co = C  # Initial conditions
    tspan = np.linspace(0, t_end, 1000)  # Time ranges from 0 to t_end

    # Solve the differential equations using odeint
    C = odeint(dydx, Co, tspan, args=(k1,))

    # Create the plot
    fig, ax = plt.subplots()  # Create figure and axis objects
    ax.plot(tspan, C[:, 0], 'r--', label='CA')
    ax.plot(tspan, C[:, 1], '-', label='CB')
    ax.plot(tspan, C[:, 2], '.', label='CC')
    ax.legend()
    ax.set_xlabel('Time')
    ax.set_ylabel('Concentration')
    ax.set_title(f'Concentration vs Time (k1={k1})')
    ax.grid(True)
    ax.set_xlim(left=0)
    ax.set_ylim(bottom=0)

    # Find index closest to the desired_time in tspan
    idx = np.abs(tspan - desired_time).argmin()
    concentrations_at_time = C[idx]
    Xa = 1 - (concentrations_at_time[0] / Co[0])

    print(f"At time {desired_time}, the conversion of A is: Xa = {Xa}")
    print(f'Concentrations at time {desired_time}: CA={concentrations_at_time[0]}, '
          f'CB={concentrations_at_time[1]}, CC={concentrations_at_time[2]}')

    # Save the plot to a temporary file
    temp_file = 'temp_plot.png'
    fig.savefig(temp_file)
    plt.close(fig)  # Close the plot to release memory

    # Upload the image to Cloudinary
    cloudinary.config(
        cloud_name="chikanma681",
        api_key="811253423913949",
        api_secret="cL01nFsZaQFV66CV8pDu1ECgWdo"
    )

    upload_result = cloudinary.uploader.upload(temp_file)

    # Get the Cloudinary URL of the uploaded image
    image_url = upload_result['secure_url']
    print(f"Uploaded image URL: {image_url}")
    concentrations_at_time_list = concentrations_at_time.tolist()

    return {
        'conversion': Xa,
        'concentrations_at_time': concentrations_at_time_list,
        'image_url': image_url
    }