from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import time


# Launch the Chrome browser
driver = webdriver.Chrome()

# Open the website
driver.get("https://mecsimcalc.com/app/9164993/pressure_design_of_pipeline_according_to_csa_z_662")  # Replace with the URL of the website

wait = WebDriverWait(driver, 10)

input_element = driver.find_element(By.NAME, "d") #By diameter

#### LF AND TF ASSUMED TO 1
# Perform actions on the input element
input_element.clear()
input_element.send_keys("600")

# Element with name="t" and comment="thickness"
element_t = driver.find_element(By.NAME, "t")
element_t.clear()
element_t.send_keys("6")

# Element with name="sy" and comment="grade"
element_sy = driver.find_element(By.NAME, "sy")
element_sy.clear()
element_sy.send_keys("370")

# Element with name="p" and comment="operating pressure"
element_p = driver.find_element(By.NAME, "p")
element_p.clear()
element_p.send_keys("9")

#Joint Factor
# Replace ':r3m:' with the name attribute value for the radio buttons
desired_value = 'Continuous welded (0.60)'  # Replace with the desired value
radio_buttons = driver.find_elements(By.XPATH, "//input[@type='radio']")

# Iterate through radio buttons and select the one with the desired value
for radio_button in radio_buttons:
    if radio_button.get_attribute("value") == desired_value:
        # print(radio_button)
        radio_button.click()
        break  # Exit the loop after clicking the desired radio button

# Find the submit button and click
submit_button = driver.find_element(By.CSS_SELECTOR, 'button[type="submit"]')# Replace with the ID of the submit button
submit_button.click()


wait = WebDriverWait(driver, 10)  # Adjust the timeout as needed
ql_editor = wait.until(EC.presence_of_element_located((By.CLASS_NAME, "ql-editor")))

# Get the HTML content from the ql-editor class
html_content = ql_editor.get_attribute('innerHTML')

# Use BeautifulSoup to parse the HTML content and extract paragraphs
soup = BeautifulSoup(html_content, 'html.parser')
paragraphs = soup.find_all('p')  # Extract all <p> tags

# Process the paragraphs as needed
res = []
for paragraph in paragraphs:
    # print(paragraph.get_text())
    text = paragraph.get_text()
    if text != "":
        res.append(text)

print(res)
# # Wait for the page to load or wait for specific elements to appear
time.sleep(100)  # Adjust the time as needed

# # Get the page source after clicking the button


driver.quit()

###WARNING lcoation factor assumed to be 1.0
