import csv
import itertools

with open('Food_Nutrition_cleaned_up.csv', mode='rU') as infile:
    with open('Food_Nutrition_cleaned.csv', mode='wb') as outfile:  # this changed slightly, look!
        csv_f = csv.reader(infile)
        writer = csv.writer(outfile)
        next(csv_f)  # skip headers
        row = next(csv_f)
        # row looks like
        # ['one', 'two', 'three four', 'five', ...]

        rewritten_row = itertools.chain.from_iterable(
            [cell.split() for cell in row])  # or map(str.split, row)
        # rewritten_row looks like
        # ['one', 'two', 'three', 'four', 'five', ...]

        writer.writerow(rewritten_row)