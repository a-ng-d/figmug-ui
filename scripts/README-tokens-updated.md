# Script de génération de tokens DTCG pour Token Studio

Ce script permet de générer une structure de tokens DTCG à partir des fichiers SCSS du projet, parfaitement compatible avec Token Studio et d'autres outils de design system.

## Structure générée

Le script analyse tous les fichiers SCSS du projet et génère plusieurs fichiers JSON pour organiser les tokens :

1. **Sets séparés** pour chaque combinaison thème/mode :

   - `colors-figma-light.json`
   - `colors-figma-dark.json`
   - `colors-sketch-light.json`
   - etc.

2. **Sets de typographie** par thème :

   - `types-figma.json`
   - `types-sketch.json`
   - etc.

3. **Sets de composants** par thème et mode :

   - `component-actions-button-figma-light.json`
   - `component-actions-button-figma-dark.json`
   - etc.

4. **Fichiers de configuration Token Studio** :
   - `$themes.json` : Définit les thèmes et les sets associés
   - `$metadata.json` : Ordre d'affichage et set actif

## Utilisation

Pour exécuter le script :

```bash
npm run generate-tokens
```

Le script va analyser les fichiers SCSS et générer plusieurs fichiers JSON dans le dossier `tokens` à la racine du projet.

## Utilisation avec Token Studio

Cette structure est parfaitement compatible avec l'extension Token Studio pour Figma. Pour l'utiliser :

1. Générer les tokens avec `npm run generate-tokens`
2. Dans Figma, ouvrir l'extension Token Studio
3. Importer le dossier `tokens` complet
4. Les thèmes seront automatiquement détectés grâce au fichier `$themes.json`
5. L'ordre d'affichage sera respecté grâce au fichier `$metadata.json`

## Structure des fichiers de thème

### `$themes.json`

Ce fichier établit les liens entre les différents sets de tokens et les thèmes. Par exemple :

```json
{
  "figma-light": {
    "id": "figma-light",
    "name": "figma-light",
    "selectedTokenSets": {
      "colors-figma-light.json": "source",
      "types-figma.json": "source",
      "globals.json": "source"
    }
  }
}
```

### `$metadata.json`

Ce fichier définit l'ordre d'affichage des sets et le set actif :

```json
{
  "tokenSetOrder": [
    "colors-figma-light.json",
    "colors-figma-dark.json",
    "types-figma.json",
    "globals.json"
  ],
  "activeTokenSet": "colors-figma-light.json"
}
```

## Configuration

Le script est configuré pour traiter les thèmes suivants :

- figma
- sketch
- penpot

Et les types de tokens suivants :

- colors
- types

Vous pouvez modifier ces valeurs dans la variable `CONFIG` du script.

## Format des tokens

Les tokens suivent la spécification DTCG (Design Tokens Community Group).

### Exemples

Un token de couleur dans un set `colors-figma-light.json` :

```json
{
  "bg": {
    "value": "#ffffff"
  }
}
```

Un token de typographie dans un set `types-figma.json` :

```json
{
  "font-stack": {
    "value": "'Inter', sans-serif"
  }
}
```
