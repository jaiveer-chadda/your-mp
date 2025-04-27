import sys

def keep_last_commas(line: str, keep: int = 5) -> str:
    """
    Remove all commas from `line` except the last `keep` of them.
    """
    total = line.count(',')
    if total <= keep:
        return line
    # remove (total - keep) commas, starting from the left
    return line.replace(',', '', total - keep)

def process_file(in_path: str, out_path: str) -> None:
    with open(in_path, 'r', encoding='utf-8') as src, \
         open(out_path, 'w', encoding='utf-8') as dst:
        for line in src:
            dst.write(keep_last_commas(line))

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(f"Usage: {sys.argv[0]} input.txt output.txt")
        sys.exit(1)
    process_file(sys.argv[1], sys.argv[2])