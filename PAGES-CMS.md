# Pages CMS

Το site διαβάζει τα επεξεργάσιμα κείμενα από τα αρχεία:

- `dist/content/site.json`
- `dist/content/announcements.json`

Η ρύθμιση του editor βρίσκεται στο `.pages.yml`. Το Pages CMS χρειάζεται GitHub repository, επειδή αποθηκεύει κάθε αλλαγή ως commit και δεν χρησιμοποιεί ξεχωριστή βάση δεδομένων.

## Σύνδεση

1. Ανέβασε το repository στο GitHub.
2. Άνοιξε το [app.pagescms.org](https://app.pagescms.org/) και συνδέσου με το GitHub.
3. Εγκατέστησε το Pages CMS GitHub App μόνο για αυτό το repository.
4. Επίλεξε το repository και το branch `main`.
5. Στο sidebar θα εμφανιστούν «Κείμενα ιστοσελίδας» και «Ανακοινώσεις».

Το workflow `.github/workflows/deploy-pages.yml` δημοσιεύει αυτόματα τον φάκελο `dist` στο GitHub Pages μετά από κάθε αλλαγή του CMS στο `main`.

Στις ρυθμίσεις του GitHub repository επίλεξε **Settings → Pages → Source: GitHub Actions**. Μετά την πρώτη επιτυχημένη εκτέλεση, κάθε αποθήκευση στο Pages CMS θα ενημερώνει αυτόματα το δημόσιο site.

