import os

KEYWORDS = ['127.0.0.1', 'localhost']
EXTENSIONS = ('.js', '.jsx', '.ts', '.tsx', '.py', '.json', '.env')

for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith(EXTENSIONS):
            path = os.path.join(root, file)
            try:
                with open(path, encoding='utf-8', errors='ignore') as f:
                    for i, line in enumerate(f, 1):
                        for kw in KEYWORDS:
                            if kw in line:
                                print(f"{path}:{i}: {line.strip()}")
            except Exception:
                continue
