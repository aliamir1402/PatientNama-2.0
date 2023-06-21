import os
import pandas as pd
import time as t
from reportlab.lib.pagesizes import A4, letter
from reportlab.pdfgen import canvas
import numpy as np
from datetime import date
from PyPDF2 import PdfMerger
import sys


def pdfGenerate(wordList):
    temp = ""
    paths = ""
    y = os.environ.get('USERNAME')
    my_canvas = canvas.Canvas(
        "C:\\Users\\"+str(y)+"\\Downloads\\"+wordList[0]+"_"+wordList[1]+"(0).pdf", pagesize=A4)
    my_canvas.setLineWidth(.3)
    my_canvas.setFont('Helvetica', 15)
    my_canvas.drawImage("logo.jpg", 30, 770, width=60, height=60)
    my_canvas.drawString(
        100, 800, "Sheikh Zayad Hospital-Surgical Unit-l, Lahore")

    my_canvas.setFont('Helvetica', 12)
    my_canvas.drawString(470, 780, 'Discharge Summary')
    my_canvas.setFont('Helvetica', 11)
    my_canvas.drawString(420, 730, "Discharge Date: ")
    today = date.today()
    d2 = today.strftime("%B %d, %Y")
    my_canvas.drawString(510, 730, d2)
    my_canvas.line(460, 773, 580, 773)

    my_canvas.drawString(440, 750, 'Admit Date:')
    my_canvas.drawString(510, 750, wordList[8])

    my_canvas.drawString(350, 710, 'Consultant Name:')
    my_canvas.drawString(450, 710, wordList[5])
    my_canvas.drawString(350, 710, 'Consultant Name:')
    my_canvas.drawString(450, 710, wordList[5])
# ----------------------------------------------------------------------------------------------
    my_canvas.setFont('Helvetica', 12)
    my_canvas.drawString(30, 680, 'Patient Information:')
    my_canvas.line(30, 670, 580, 670)
    my_canvas.setFont('Helvetica', 12)
    my_canvas.drawString(30, 680, 'Patient Information:')
    my_canvas.line(30, 670, 580, 670)

    my_canvas.setFont('Helvetica', 10)
    my_canvas.drawString(40, 650, 'Name:')
    my_canvas.drawString(100, 650, wordList[1])
    my_canvas.drawString(40, 630, 'Gender:')
    my_canvas.drawString(100, 630, wordList[7])
    my_canvas.drawString(40, 610, 'Address:')
    my_canvas.drawString(100, 610, wordList[4])

    my_canvas.drawString(250, 650, 'Age:')
    my_canvas.drawString(280, 650, wordList[2])
    my_canvas.drawString(250, 630, 'Mobile No:')
    my_canvas.drawString(315, 630, wordList[4])

    my_canvas.drawString(430, 650, 'Cnic:')
    my_canvas.drawString(460, 650, wordList[3])
    my_canvas.drawString(430, 630, 'Hospital Number:')
    my_canvas.drawString(520, 630, wordList[0])

# ------------------------------------------------------------------------------------

    my_canvas.setFont('Helvetica', 12)
    my_canvas.drawString(30, 510+70, 'Clinical Data:')
    my_canvas.line(30, 500+70, 580, 500+70)
    my_canvas.setFont('Helvetica', 12)
    my_canvas.drawString(30, 510+70, 'Clinical Data:')
    my_canvas.line(30, 500+70, 580, 500+70)

    my_canvas.setFont('Helvetica', 10)
    my_canvas.drawString(50, 475+70, 'Present Complaint')
    my_canvas.setFont('Helvetica', 10)
    my_canvas.drawString(50, 475+70, 'Present Complaint')
    my_canvas.setFont('Helvetica', 9.5)

    temp = str(wordList[10])
    word = temp.split(".")

    for i in range(len(word)):
        my_canvas.drawString(50, (460+70)-((i+1)*12), word[i])
    # my_canvas.rect(40, 440, 530, 120, stroke=1, fill=0)

    my_canvas.setFont('Helvetica', 10)
    my_canvas.drawString(50, 420+70-50, 'Examination Findings')
    my_canvas.setFont('Helvetica', 10)
    my_canvas.drawString(50, 420+70-50, 'Examination Findings')

    my_canvas.setFont('Helvetica', 9.5)
    temp = ""
    word.clear()
    temp = str(wordList[11])
    word = temp.split("|")
    for i in range(len(word)):
        my_canvas.drawString(50, (400+70-50)-((i+1)*12), word[i])
    # my_canvas.rect(310, 430, 220, 100, stroke=1, fill=0)
# -------------------------------------------------------------------------------------
    my_canvas.setFont('Helvetica', 12)
    my_canvas.drawString(30, 420-100, 'Investigations:')
    my_canvas.line(30, 410-100, 580, 410-100)
    my_canvas.setFont('Helvetica', 12)
    my_canvas.drawString(30, 420-100, 'Investigations:')
    my_canvas.line(30, 410-100, 580, 410-100)

    my_canvas.setFont('Helvetica', 10)
    my_canvas.drawString(30, 390-100, 'CBC:')
    my_canvas.drawString(100, 390-100, wordList[12])
    my_canvas.drawString(30, 375-100, 'LFT:')
    my_canvas.drawString(100, 375-100, wordList[13])
    my_canvas.drawString(30, 360-100, 'Electrolyte:')
    my_canvas.drawString(100, 360-100, wordList[14])
    my_canvas.drawString(30, 345-100, 'Viral Markers:')
    my_canvas.drawString(100, 345-100, wordList[15])
    my_canvas.drawString(30, 330-100, 'Imaging:')
    my_canvas.drawString(100, 330-100, wordList[16])
    my_canvas.drawString(30, 295+20-100, 'Others:')
    my_canvas.drawString(100, 295+20-100, wordList[17])

    my_canvas.setFont('Helvetica', 12)
    my_canvas.drawString(30, 285-100, 'Operative Notes')
    my_canvas.setFont('Helvetica', 12)
    my_canvas.drawString(30, 285-100, 'Operative Notes')

    temp = ""
    word.clear()
    temp = str(wordList[18])
    word = temp.split("|")
    my_canvas.setFont('Helvetica', 10)
    for i in range(len(word)):
        my_canvas.drawString(40, (265-100)-(12*(i+1)), word[i])
 # -----------------------------------------------------------------------------
    my_canvas.line(30, 280-100, 580, 280-100)
    my_canvas.save()
# ----------------------------------------------------------------------------------------------
    my_canvasT = canvas.Canvas(
        "C:\\Users\\"+str(y)+"\\Downloads\\"+wordList[0]+"_"+wordList[1]+"(1).pdf", pagesize=A4)
    my_canvasT.setLineWidth(.3)
    my_canvasT.setFont('Helvetica', 15)
    my_canvasT.drawImage("logo.jpg", 30, 770, width=60, height=60)
    my_canvasT.drawString(
        100, 800, "Sheikh Zayad Hospital-Surgical Unit-l, Lahore")

    my_canvasT.setFont('Helvetica', 12)
    my_canvasT.drawString(470, 780, 'Discharge Summary')
    my_canvasT.setFont('Helvetica', 11)
    my_canvasT.drawString(420, 730, "Discharge Date: ")
    today = date.today()
    d2 = today.strftime("%B %d, %Y")
    my_canvasT.drawString(510, 730, d2)
    my_canvasT.line(460, 773, 580, 773)

    my_canvasT.drawString(440, 750, 'Admit Date:')
    my_canvasT.drawString(510, 750, wordList[8])

    my_canvasT.drawString(350, 710, 'Consultant Name:')
    my_canvasT.drawString(450, 710, wordList[5])
    my_canvasT.drawString(350, 710, 'Consultant Name:')
    my_canvasT.drawString(450, 710, wordList[5])

    my_canvasT.drawString(30, 680, 'Course / Treatment')
    my_canvasT.line(30, 675, 580, 675)
    my_canvasT.drawString(30, 680, 'Course / Treatment')
    my_canvasT.line(30, 675, 580, 675)

    my_canvasT.setFont('Helvetica', 9.5)
    temp = ""
    word.clear()
    temp = str(wordList[19])
    word = temp.split("|")

    for i in range(len(word)):
        my_canvasT.drawString(40, 660-((i+1)*12), word[i])
    # my_canvas.rect(310, 210, 220, 50, stroke=1, fill=0)
# ------------------------------------------------------------------------------
    my_canvasT.setFont('Helvetica', 13)
    my_canvasT.drawString(30, 198+300, 'Discharge Medicines')
    my_canvasT.setFont('Helvetica', 13)
    my_canvasT.drawString(30, 198+300, 'Discharge Medicines')

    my_canvasT.setFont('Helvetica', 13)
    my_canvasT.drawString(30, 40+300, 'FollowUp Instructions')
    my_canvasT.setFont('Helvetica', 13)
    my_canvasT.drawString(30, 40+300, 'FollowUp Instructions')
    my_canvasT.line(30, 195+300, 580, 195+300)
    my_canvasT.line(30, 35+300, 580, 35+300)

    my_canvasT.setFont('Helvetica', 11)
    my_canvasT.drawString(40, 175+300, "Name")
    my_canvasT.drawString(150, 175+300, "Dose")
    my_canvasT.drawString(250, 175+300, "Times")
    my_canvasT.drawString(350, 175+300, "Days")

    medical_count = int((len(wordList)-1-20)/4)
    for i in range(medical_count):
        my_canvasT.setFont('Helvetica', 9)
        my_canvasT.drawString(40, 160+300-(10*i), wordList[20+i*4])
        my_canvasT.drawString(150, 160+300-(10*i), wordList[21+i*4])
        my_canvasT.drawString(250, 160+300-(10*i), wordList[22+i*4])
        my_canvasT.drawString(350, 160+300-(10*i), wordList[23+i*4])

    my_canvasT.setFont('Helvetica', 9)
    temp = ""
    word.clear()
    temp = str(wordList[len(wordList)-1])
    word = temp.split("|")
    for i in range(len(word)):
        my_canvasT.drawString(40, (25+300)-((i+1)*12), word[i])

    my_canvasT.setFont('Helvetica', 9)
    my_canvasT.drawString(
        50, 10+100, "Doctor's Signature:_____________________")

    my_canvasT.setFont('Helvetica', 9)
    my_canvasT.drawString(
        330, 10+100, "Consultant's Signature:_____________________")

    my_canvasT.save()
# ----------------------------------------------------------------------------------------------

    # Create an instance of PdfFileMerger() class
    merger = PdfMerger()

    # Create a list with the file paths
    pdf_files = ["C:\\Users\\"+str(y)+"\\Downloads\\"+wordList[0]+"_"+wordList[1]+"(0).pdf",
                 "C:\\Users\\"+str(y)+"\\Downloads\\"+wordList[0]+"_"+wordList[1]+"(1).pdf"]

    # Iterate over the list of the file paths
    for pdf_file in pdf_files:
        # Append PDF files
        merger.append(pdf_file)

    # Write out the merged PDF file
    merger.write("C:\\Users\\"+str(y)+"\\Downloads\\" +
                 wordList[0]+"_"+wordList[1]+".pdf")
    merger.close()

    if os.path.exists("C:\\Users\\"+str(y)+"\\Downloads\\"+wordList[0]+"_"+wordList[6]+"(0).pdf"):
        os.remove("C:\\Users\\"+str(y)+"\\Downloads\\" +
                  wordList[0]+"_"+wordList[1]+"(0).pdf")
    else:
        print("The file does not exist")

    if os.path.exists("C:\\Users\\"+str(y)+"\\Downloads\\"+wordList[0]+"_"+wordList[6]+"(1).pdf"):
        os.remove("C:\\Users\\"+str(y)+"\\Downloads\\" +
                  wordList[0]+"_"+wordList[1]+"(1).pdf")
    else:
        print("The file does not exist")

    paths = "C:\\Users\\"+str(y)+"\\Downloads\\" + \
        wordList[0]+"_"+wordList[1]+".pdf"
    paths = str(paths)
    if os.path.exists(paths):
        os.rename(paths, paths.replace(" ", "_"))
        pass
    else:
        print("The file does not exist")

    print("Path:", paths.replace(" ", "_"))
    os. system(paths.replace(" ", "_"))


def readFile():
    word = []

    # Open the file in read mode
    file_path = "download.txt"
    file = open(file_path, "r")

    # Read the contents of the file
    file_contents = file.read()

    # Close the file
    file.close()

    word = file_contents.split("|")

    return word


if __name__ == "__main__":
    wordList = []
    wordList = readFile()
    pdfGenerate(wordList)
