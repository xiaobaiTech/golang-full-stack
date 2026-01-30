#!/usr/bin/env python3
import os
import re
import datetime

ROOT = os.path.dirname(os.path.abspath(__file__))
SITE_SRC = os.path.join(os.path.dirname(ROOT), "src")

def read_text(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

def write_text(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

def has_frontmatter(text):
    return text.lstrip().startswith("---\n")

def extract_title(text, filename):
    m = re.search(r"^#\s+(.+)$", text, flags=re.M)
    if m:
        return m.group(1).strip()
    base = os.path.splitext(os.path.basename(filename))[0]
    return base

def extract_description(text):
    # find first non-empty paragraph without markdown headers or images
    lines = text.strip().splitlines()
    buf = []
    for ln in lines:
        if ln.strip().startswith("#"):
            continue
        if ln.strip().startswith("!") or ln.strip().startswith("```"):
            continue
        if ln.strip() == "":
            if buf:
                break
            else:
                continue
        buf.append(ln.strip())
        if len(" ".join(buf)) > 220:
            break
    desc = " ".join(buf)
    desc = re.sub(r"\s+", " ", desc)
    return desc[:220]

def category_and_tags(rel_path):
    parts = rel_path.split(os.sep)
    # e.g., golang/核心知识点/xxx.md -> category=golang, tags=[核心知识点]
    category = parts[0] if parts else "blog"
    tags = []
    if len(parts) > 1:
        tags.append(parts[1])
    return category, tags

def build_frontmatter(title, description, category, tags):
    date = datetime.date.today().isoformat()
    fm_lines = [
        "---",
        f"title: {title}",
        f"description: {description}",
        "author: 小白debug",
        f"date: {date}",
        f"category: {category}",
        "tags:",
    ]
    for t in tags:
        fm_lines.append(f"  - {t}")
    fm_lines.append("---\n")
    return "\n".join(fm_lines)

def process_file(abs_path, rel_path):
    text = read_text(abs_path)
    if has_frontmatter(text):
        return False
    title = extract_title(text, abs_path)
    description = extract_description(text)
    category, tags = category_and_tags(rel_path)
    fm = build_frontmatter(title, description, category, tags)
    write_text(abs_path, fm + text)
    return True

def main():
    changed = 0
    for root, dirs, files in os.walk(SITE_SRC):
        # skip .vuepress
        if ".vuepress" in root:
            continue
        for name in files:
            if name.endswith(".md"):
                abs_path = os.path.join(root, name)
                rel_path = abs_path.replace(SITE_SRC + os.sep, "")
                try:
                    if process_file(abs_path, rel_path):
                        changed += 1
                except Exception as e:
                    print(f"[WARN] skip {rel_path}: {e}")
    print(f"[DONE] frontmatter fixed for {changed} files.")

if __name__ == "__main__":
    main()

