import re

with open('/Users/federicodeponte/linkedin-carousel/slides.html', 'r') as f:
    html = f.read()

# Slide 4 - replace letter-preview content with image
slide4_old = '''<div class="letter-preview">
                    <div class="letterhead">
                        <div class="company">TechCorp GmbH</div>
                        <div class="date">January 12, 2026</div>
                    </div>
                    <div class="address">
                        Mr. John Smith<br>
                        123 Business Street<br>
                        Berlin, 10115
                    </div>
                    <div class="subject">RE: Contract Termination Notice</div>
                    <div class="body">
                        Dear Mr. Smith,<br><br>
                        We regret to inform you that we will be terminating our service agreement effective February 28, 2026, in accordance with Section 4.2...<br><br>
                        Please ensure all outstanding deliverables are completed by the termination date.
                    </div>
                    <div class="signature">
                        Best regards,<br><br>
                        <strong>Maria Schmidt</strong><br>
                        Legal Department
                    </div>
                </div>'''
slide4_new = '<img src="visuals/openword.png" style="width:100%; max-height:600px; object-fit:contain; border-radius:12px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">'
html = html.replace(slide4_old, slide4_new)

# Slide 5 - replace agents-pipeline with image
pattern5 = r'<div class="agents-pipeline">.*?</div>\s*</div>\s*</div>\s*</div>'
html = re.sub(pattern5, '<img src="visuals/opendraft.png" style="width:100%; max-height:650px; object-fit:contain; border-radius:12px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">', html, flags=re.DOTALL, count=1)

# Slide 6 - replace graphics-grid with image  
pattern6 = r'<div class="graphics-grid">.*?</div>\s*</div>\s*</div>\s*</div>\s*</div>'
html = re.sub(pattern6, '<img src="visuals/openfigma.png" style="width:100%; max-height:650px; object-fit:contain; border-radius:12px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">', html, flags=re.DOTALL, count=1)

# Slide 7 - replace pipeline-flow with image
pattern7 = r'<div class="pipeline-flow">.*?</div>\s*</div>\s*</div>\s*</div>'
html = re.sub(pattern7, '<img src="visuals/openblog.png" style="width:100%; max-height:650px; object-fit:contain; border-radius:12px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">', html, flags=re.DOTALL, count=1)

# Slide 8 - replace json-output with image
pattern8 = r'<div class="json-output">.*?</div>\s*</div>\s*</div>\s*</div>'
html = re.sub(pattern8, '<img src="visuals/openkeyword.png" style="width:100%; max-height:650px; object-fit:contain; border-radius:12px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">', html, flags=re.DOTALL, count=1)

# Slide 9 - replace extraction-demo with image
pattern9 = r'<div class="extraction-demo">.*?</div>\s*</div>\s*</div>\s*</div>'
html = re.sub(pattern9, '<img src="visuals/openinvoice.png" style="width:100%; max-height:650px; object-fit:contain; border-radius:12px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">', html, flags=re.DOTALL, count=1)

with open('/Users/federicodeponte/linkedin-carousel/slides.html', 'w') as f:
    f.write(html)

print('Done!')
