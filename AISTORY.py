import openai
from gtts import gTTS
from fpdf import FPDF
import pygame
# Load your API key
with open("api_key.txt") as f:
    openai.api_key = f.read().strip()

# Input from user
prompt = input("Enter a story prompt: ")

# Generate story
response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[{"role": "user", "content": f"Write a short children's story about: {prompt}"}]
)
story = response.choices[0].message.content
print("\nGenerated Story:\n", story)

# Save as PDF
pdf = FPDF()
pdf.add_page()
pdf.set_font("Arial", size=12)
pdf.multi_cell(0, 10, story)
pdf.output("story.pdf")

# Convert to MP3
tts = gTTS(text=story, lang='en')
tts.save("story.mp3")

# Play the audio
pygame.mixer.init()
pygame.mixer.music.load("story.mp3")
pygame.mixer.music.play()

input("Press Enter to exit...")
