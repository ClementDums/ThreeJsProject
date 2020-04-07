
# Conception & Architecture

## Schéma bloc

![schame bloc](http://pierrebrelaud.fr/webgl/images/schema_bloc.png)

### Helpers
Fonctions génériques mises à disposition pour les différentes classes du projet :
> **Math** : conversion de matrices, trigonométrie...<br>
> **Audio**<br>
> **Lights**<br>
> **User Interaction** : eventListener, récupération de la position de la souris...<br>
> **Mouvement**<br>
> **Camera**<br>
> **Particles**<br>
> **3D** : import/implémentation des modèles 3D, position...<br>


### API
Classes de réception des données API et de traitement. API utilisées pour le projet notamment utilisées pour la transformation des œuvres d'art  pour immersion plus forte pour l'utilisateur :
>**Twitter** <br>
> **Facebook**<br>
> **Snapchat**<br>
> ...<br>

### Librairies
Librairies externes utilisées pour le développement
>**ThreeJS**

### App

Point d'entrée de l'application, c'est ici que seront regroupés tous les blocs du projet (import des rendus 3D, éléments d’interface...) pour ensuite effectuer le  cheminement complet de l'expérience.

### Camera
Setup de la camera, rattachement aux objets concernés (ex : personnage). 

### Environnement
Gestion des événements météorologiques visuels et sonore, gestion de l’ambiance musicale de l’environnement.

### Scenes
Mise en place des différentes scènes : Extérieur, intérieur et chambre.

### 3D
Gestion des différents modèles 3D utilisés dans l'expérience notamment les déplacements, sons, lumières...
> **Character**<br>
> **Phone**<br>
> **Work of art**<br>
> **Airship**<br>
> **Sets/Decors**<br>


### UI
Composants permettant une interaction avec l'utilisateur (ex: boutons, gestion du volume de l'expérience).

### Assets
Images, vidéos, modèles 3D, sons, textes.

### Phone/Real Device
Utilisation du téléphone physique pour un traitement de données (ex: gyroscope...).
Envoi des données au site par socket.
Création d'un interface sur le téléphone.
Ceci permettra à l'utilisateur d'avoir comme seul interaction avec l'expérience son téléphone et rendra le contenu plus immersif.

# Choix de la plateforme

Pour cette expérience, nous utiliserons un **site web** destiné aux ordinateur (reste à déterminer la puissance de l'ordinateur ciblé en fonction des premiers tests que nous effectuerons) pour permettre une expérience **plus immersive** que sur un téléphone. <br>
Le choix d'une expérience web est également renforcé car nous allons utiliser différentes **API** pour permettre de passer un message avec plus de poids à l'utilisateur.<br>
Enfin nous allons également permettre à l'utilisateur d'utiliser son **téléphone** comme **seul outil d'interaction** avec l'expérience. Cela permet une nouvelle fois de rendre le contenu plus **immersif** et est également en **accord avec notre sujet** basé sur **les réseaux sociaux**.


# Planification

|Tâche|Risque|Développeur|Date Max|
|-|-|-|-|
|**POC** Faire réagir un objet à du son|-|Pierre|10/04|
|**POC** Application d'un filtre sur un objet 3D|-|Clément|10/04|
|**POC** Faire suivre un mouvement à des particules|-|Pierre|10/04|
|**POC** Faire bouger les particules avec les actions utilisateur (mouvement souris)|-|Clément/Pierre|10/04|
|**POC** Objet 3d contenant de billes, activation de la gravité et destruction de cette forme|Problème de performances > possibilité d'utiliser des particules à la place de billes 3D|Clément|10/04|
|**POC** Des particules qui créent/remplissent au fur et à mesure un objet|||10/04|
|**3D** Personnage  (intégration, mouvement, audio associé > bruits de pas)|-|Clément|20/04
|**3D** Dirigeables (intégration, mouvement, lumière)|-|Clément|20/04
|**3D** Téléphone (intégration, interactions, lumière)|-|Pierre|20/04
|**3D** Oeuvres d'art (intégration, interactions)|-|Pierre|20/04
|**3D** Décors (intégration)|-|Clément|20/04
|**Camera** Gestion de la caméra pour toute l'expérience|-|Clément|20/04
|**Environnement** Mettre en place l'audio et les effets nécessaires à l'ambiance de l'expérience (orage, musiques...)|-|Pierre|08/05
|**API** Connexion aux différentes API nécessaires (Twitter, Youtube, Facebook...)|-|Pierre|08/05
|**Téléphone** Établir la connexion entre le téléphone de l'utilisateur et le système via un QRCode |En fonction du temps de développement restant et de la complexité des fonctionnalités liées au téléphone, nous déciderons de supprimer ou non ces fonctionnalités. L'utilisateur utilisera la souris de l'ordinateur à la place. |Pierre|08/05
|**Téléphone** Création de l'UI que verra l'utilisateur sur son téléphone|-|Pierre|08/05
|**Téléphone** Récupération des données du téléphone (gyroscope...)|-|Pierre|08/05
|**UI** Création de la landing page qui permettra à l'utilisateur de lancer l'expérience  |-|Clément|08/05
|**UI** Création des éléments d’interactions (boutons, volume...)|-|Clément|08/05
|**Expérience** Une fois tous les éléments créés et "fonctionnels" > création du cheminement complet de l'expérience |-|Clément/Pierre|08/05
|**Expérience** Ajout des textes/voix off expliquant l'expérience|-|Clément|08/05
|**Performances** Optimisation des performances|-|Clément/Pierre|11/05
|**Tests** Correction de bugs et tests|-|Clément/Pierre|11/05

# Structure de projet et prototypage

Racine du projet : 
https://github.com/ClementDums/ThreeJsProject

# Charnière design/dev

- Les modèles 3D doivent être exportés en **.glb** ou en **.gltf** ce format permet  d’optimiser la  taille et le temps de chargement.
- Création de modèles 3D avec une **taille cohérente** (pas plus grand ou plus petit qu’il ne faut).

- Tous les modèles 3D du site doivent être exportés en utilisant une **échelle commune** afin de faciliter l’intégration des développeurs sans avoir à les redimensionner.

- Les **textures exportées** doivent avoir une taille correspondant à une **puissance de 2** (256*256 par exemple). Cela permet d’appliquer les textures en utilisant le MipMapping afin d’éviter les problèmes d’aliasing.

- **Ne pas modéliser** ce qui ne sera **pas visible** afin de gagner en performance. Par exemple l’extérieur et les autres salles du musée ou la face du personnage si l’on ne voit que son dos dans l'expérience.

- **Minimiser** autant que possible le **nombre de polygones** qui composent un objet 3D afin de gagner en performance.

- Faire attention à la position du **point d’ancrage** ou **point de pivot**. L’objet 3D va tourner autour de celui-ci lors de la rotation.

- Seule l’**animation intrinsèque** : personnage qui marche, court, bat des ailes… doit être réalisée par les **designers**.
L’animation **extrinsèque** : déplacement du personnage dans le monde 3D est à la charge du **développeur**.

- Les éléments seront fournis aux développeurs sur un **Trello** dédié. Plusieurs cartes seront présentes (todo, en cours, à validé, done).

# Proofs of concept

http://pierrebrelaud.fr/webgl/poc/
