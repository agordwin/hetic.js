'use strict';

document.body.innerHTML = `
<div id="app" class="ui container">
    <div data-hook="view"></div>
</div>
`;

// Basics

let random = function(min, max) {
    return Math.floor(Math.random() * (max - min || 99)) + (min || 1);
};

let randomize = function() {
    let array = [].slice.call(arguments);
    return array[Math.floor(Math.random() * array.length)];
};

let equals = function(a, b) {
    return Object.keys(a).length === Object.keys(b).length
        && Object.keys(a).reduce(function(memo, key) { return memo && a[key] === b[key]; }, true)
        && Object.keys(b).reduce(function(memo, key) { return memo && a[key] === b[key]; }, true);
}

// DOM

let cartman = [
    {}, {cadmiumyellow: true}, {bondiblue: true}, {},
    {candyapplered: true}, {champagne: true}, {champagne: true}, {candyapplered: true},
    {candyapplered: true}, {candyapplered: true}, {candyapplered: true}, {candyapplered: true},
    {braken: true}, {candyapplered: true}, {candyapplered: true}, {braken: true}
];
let kenny = [
    {safetyorange: true}, {safetyorange: true}, {safetyorange: true}, {safetyorange: true},
    {safetyorange: true}, {braken: true}, {champagne: true}, {safetyorange: true},
    {safetyorange: true}, {safetyorange: true}, {safetyorange: true}, {safetyorange: true},
    {braken: true}, {braken: true}, {braken: true}, {braken: true},
];
let kyle = [
    {kellygreen: true}, {islamicgreen: true}, {islamicgreen: true}, {kellygreen: true},
    {kellygreen: true}, {champagne: true}, {champagne: true}, {kellygreen: true},
    {safetyorange: true}, {safetyorange: true}, {safetyorange: true}, {safetyorange: true},
    {}, {darkgreen: true}, {darkgreen: true}, {}
];

let board = function(squares) {
    let ul = document.createElement('ul');
    ul.className = 'board';
    squares.forEach(function(square) {
        let li = document.createElement('li');
        li.className = '';
        for (let property in square)
            li.className += property + ' ';
        li.className = li.className.slice(0, -1);
        ul.appendChild(li);
    });

    return ul.outerHTML;
}

// Forms

let form = function() {
    return `
        <div class="todos">
            <div class="ui input">
                <input type="text" placeholder="Ajouter un todo...">
            </div>
            <ul class="ui list"></ul>
            <div class="ui tiny buttons">
                <button class="ui button filter-todo">0 à faire</button>
                <button class="ui button filter-done">0 fait</button>
            </div>
        </div>
    `;
}

let keypress = function(el, key) {
    let oEvent = document.createEvent('KeyboardEvent');

    // Chromium Hack
    Object.defineProperty(oEvent, 'keyCode', { get : function() { return this.keyCodeVal; }});
    Object.defineProperty(oEvent, 'which', { get : function() { return this.keyCodeVal; } });

    if (oEvent.initKeyboardEvent) {
        oEvent.initKeyboardEvent("keypress", true, true, document.defaultView, false, false, false, false, key, key);
    } else {
        oEvent.initKeyEvent("keypress", true, true, document.defaultView, false, false, false, false, key, 0);
    }

    oEvent.keyCodeVal = key;
    el.dispatchEvent(oEvent);
}

let elContains = function(el, value) {
    return !!(el && el.innerHTML.indexOf(value) !== -1);
}

//
// Chapters
//

let chapters = [
    {
        title: "Bases du langage",
        description: "JavaScript est un langage de programmation dynamique, principalement utilisé dans les navigateurs web pour interagir avec l'utilisateur, modifier l'état de la page et communiquer avec un serveur de façon asynchrone. Depuis peu, il est aussi utilisé côté serveur à l'aide d'environnements d'exécution (<i>comme Node.js</i>).<br><br>Ce chapitre présente les bases du language, les variables (<i>nombres, chaines de caractères, etc</i>), les opérations (<i>addition, concaténation</i>), les conditions et le boucles.",
        color: "green",
        steps: [
            {
                title: "Initialiser une variable",
                description: "Créer une variable nommée <code>secret</code> et lui affecter la valeur numérique <code>12</code>",
                excerpt: "Une variable est un symbole qui associe un nom à une valeur stockée en mémoire. Le nom doit être unique. La valeur peut être de plusieurs types.<br><br>JavaScript est un langage typé dynamiquement, toutes les variables sont définies avec le mot clé <code>var</code> et le moteur d'exécution se charge de leur affecter le type adéquat (<i>type qui peut évoluer dans le temps</i>). Le langage propose trois types primitifs — nombre, chaine de caractères et booléen — et deux types composites — objet et tableau.<br><br><strong>Exemple</strong> : l'instruction <code>var value = 5;</code> déclare la variable <code>value</code> et lui affecte la valeur numérique <code>5</code> (<i>le point virgule en fin de chaque ligne est optionnel</i>).",
                warn: "La variable <code>secret</code> doit être déclarée et initialisée à <code>12</code>",
                answer: function() {
                    return secret === 12;
                }
            },
            {
                title: "Additionner deux nombres",
                description: "Créer une variable nommée <code>secret</code> et lui affecter la somme des variables numériques <code>x</code> et <code>y</code> (<i>déclarées par ce tutoriel</i>).",
                excerpt: "Un opérateur est un symbole qui représente une action. Il permet de modifier la valeur des variables. Tous les opérateurs ne s'appliquent pas à tous les types de variables.<br><br>L'opérateur mathématiques <code>+</code> additionne les nombres et concatène les chaines de caractères (<i>les ajoute bout à bout</i>).<br><br>Les opérateurs mathématiques <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code> s'appliquent aux nombres uniquement. Les opérations mathématiques sont effectuées de gauche à droite, la multiplication, la division et le modulo ont la priorité sur l'addition et la soustraction. Pour modifier l'ordre, il est possible d'utiliser des parenthèses. <br><br><strong>Exemple</strong> : l'instruction <code>var value = 5 + 10;</code> déclare la variable <code>value</code> et lui affecte le résultat de l'opération, <code>15</code>.",
                init: function() {
                    window.x = this.x = random();
                    window.y = this.y = random();
                },
                secret: function() {
                    return this.x + this.y;
                },
                warn: function() {
                    return "La variable <code>secret</code> vaut <code>" + JSON.stringify(secret) + "</code> et non la résultat attendu, <code>" + this.secret() + "</code>";
                },
                answer: function() {
                    return secret === this.secret();
                }
            },
            {
                title: "Concaténer deux chaines de caractères",
                description: "Créer une variable nommée <code>secret</code> et lui affecter la concaténation des variables <code>x</code> et <code>y</code> séparées d'un espace (<i>déclarées par ce tutoriel</i>).",
                excerpt: "Ajouter une chaine de caractères à une autre avec l'opérateur <code>+</code> permet de les concaténer (<i>les mettre bout à bout</i>).<br><br>Pour ajouter un espace à une chaine existante, il est possible de créer une chaine composée uniquement d'un espace <code>' '</code>. Les chaines de caractères peuvent être déclarées à l'aide de guillemets simples <code>'lorem ipsum'</code> ou double <code>\"lorem ipsum bacon\"</code>.<br><br><strong>Exemple</strong> : <code>'lorem ' + 'ipsum'</code> crée la chaine <code>'lorem ipsum'</code>.",
                init: function() {
                    window.x = this.x = randomize('purple', 'sapphire', 'blue', 'red');
                    window.y = this.y = randomize('skate', 'rollers', 'submarine');
                },
                secret: function() {
                    return this.x + ' ' + this.y;
                },
                warn: function() {
                    return "La variable <code>secret</code> vaut <code>" + JSON.stringify(secret) + "</code> et non la résultat attendu, <code>" + this.secret() + "</code>";
                },
                answer: function() {
                    return secret === this.secret();
                }
            },
            {
                title: "Diviser deux nombres",
                description: "Créer une variable nommée <code>secret</code> et lui affecter le résultat de la division de la variables <code>x</code> par <code>y</code> (<i>déclarées par ce tutoriel</i>) arrondi à l'entier inférieur.",
                excerpt: "Il est possible d'effectuer des arrondis avec la fonction <code>parseInt(value, 10)</code> ou <code>Math.floor(value)</code> (<i>founies par tous les navigateurs</i>).",
                init: function() {
                    window.x = this.x = randomize(13, 23, 33, 43, 53);
                    window.y = this.y = randomize(2, 4, 6, 8);
                },
                secret: function() {
                    return parseInt(this.x / this.y, 10);
                },
                warn: function() {
                    return "La variable <code>secret</code> vaut <code>" + JSON.stringify(secret) + "</code> et non la résultat attendu, <code>" + this.secret() + "</code>";
                },
                answer: function() {
                    return secret === this.secret();
                }
            },
            {
                title: "Retourner le plus grand de deux nombres",
                description: "Créer une variable nommée <code>secret</code> et lui affecter la valeur du plus grand nombre parmi <code>x</code> et <code>y</code> (<i>déclarées par ce tutoriel</i>).",
                excerpt: "L'objet <code>Math</code> dispose également d'autres fonctionnalités pour identifier les maximum, minimum, sinus, etc. Il est également possible d'écrire une condition qui vérifie lequel des nombres est le plus grand avec <code>if</code>. L'expression conditionnelle <code>if</code> effectue une opération si sa condition est vérifiée (<i>égale à true</i>). L'expression facultative <code>else</code> effectue une opération dans le cas inverse.<br><br><strong>Exemple</strong> : <code>if (value > 10) { console.log('value is greater than 10'); } else { ... }</code> affiche le texte dans la console du navigateur si la variable value est supérieure à 10. Les accolades délimitent le code à exécuter si la condition est vérifiée, il est préférable de sauter une ligne entre chaque instruction pour la lisibilité.",
                init: function() {
                    window.x = this.x = random();
                    window.y = this.y = random();
                },
                secret: function() {
                    return Math.max(this.x, this.y);
                },
                warn: function() {
                    return "La variable <code>secret</code> vaut <code>" + JSON.stringify(secret) + "</code> et non la résultat attendu, <code>" + this.secret() + "</code>";
                },
                answer: function() {
                    return secret === this.secret();
                }
            },
            {
                title: "Retourner la plus grande de deux chaines",
                description: "Créer une variable nommée <code>secret</code> et lui affecter la valeur de la chaîne de caractères la plus longue parmi <code>x</code> et <code>y</code> (<i>déclarées par ce tutoriel</i>).",
                excerpt: "Les chaines de caractères sont des tableaux de caractères. Elles disposent donc d'un attribut <code>length</code> indiquant leur nombre d'éléments. Il est également possible d'accéder - comme pour un tableau - à un élément avec son index.<br><br><strong>Exemple</strong> : <code>'lorem ipsum'.length</code> retourne <code>11</code>, car la chaine est composée de 11 caractères. <code>'lorem ipsum'[3]</code> retourne <code>e</code>, car il s'agit du 4iem caractère de la chaine (<i>l'index des tableaux commence à zéro</i>).",
                init: function() {
                    window.x = this.x = randomize('purple', 'sapphire', 'blue', 'red');
                    window.y = this.y = randomize('skate', 'rollers', 'submarine');
                },
                secret: function() {
                    return this.x.length > this.y.length ? this.x : this.y;
                },
                warn: function() {
                    return "La variable <code>secret</code> vaut <code>" + JSON.stringify(secret) + "</code> et non la résultat attendu, <code>" + this.secret() + "</code>";
                },
                answer: function() {
                    return secret === this.secret();
                }
            },
            {
                title: "Initialiser un booléen",
                description: "Créer une variable nommée <code>secret</code> et lui affecter <code>true</code> si la somme de <code>x</code> et <code>y</code> (<i>déclarées par ce tutoriel</i>) est supérieure à 100, <code>false</code> sinon.",
                excerpt: "En plus des nombres et des chaines de caractères, le language dispose de booléens, des variables dont la valeur est <code>true</code> ou <code>false</code>. Les conditions et les boucles sont basées sur des tests booléens (<i>faits par le navigateur</i>).",
                init: function() {
                    window.x = this.x = randomize(30, 40, 50);
                    window.y = this.y = randomize(50, 60, 70);
                },
                secret: function() {
                    return this.x + this.y > 100;
                },
                warn: function() {
                    return "La variable <code>secret</code> vaut <code>" + JSON.stringify(secret) + "</code> et non la résultat attendu, <code>" + this.secret() + "</code>";
                },
                answer: function() {
                    return secret === this.secret();
                }
            },
            {
                title: "Effectuer deux conditions simultanées",
                description: "Créer une variable nommée <code>secret</code> et lui affecter <code>true</code> si <code>x</code> et <code>y</code> (<i>déclarées par ce tutoriel</i>) sont tous deux supérieurs à 10, <code>false</code> sinon.",
                excerpt: "Les opérateurs et <code>&&</code> et ou <code>||</code> permettent de combiner des conditions.<br><br><strong>Exemple</strong> : <code>10 < 12 && 12 < 15</code> retourne <code>true</code> car les deux conditions sont vérifiées. <code>10 < 12 || 12 > 15</code> retourne <code>true</code> car une des deux conditions est vérifiée. <code>10 > 12 || 12 > 15</code> retourne <code>false</code> car aucune des deux conditions n'est vérifiée.",
                init: function() {
                    window.x = this.x = randomize(5, 9, 14, 18);
                    window.y = this.y = randomize(5, 9, 14, 18);
                },
                secret: function() {
                    return this.x > 10 && this.y > 10;
                },
                warn: function() {
                    return "La variable <code>secret</code> vaut <code>" + JSON.stringify(secret) + "</code> et non la résultat attendu, <code>" + this.secret() + "</code>";
                },
                answer: function() {
                    return secret === this.secret();
                }
            },
            {
                title: "Effectuer une condition ou une autre",
                description: "Créer une variable nommée <code>secret</code> et lui affecter <code>true</code> si <code>x</code> ou <code>y</code> (<i>déclarées par ce tutoriel</i>) est supérieur à 10, <code>false</code> sinon.",
                init: function() {
                    window.x = this.x = randomize(5, 9, 14, 18);
                    window.y = this.y = randomize(5, 9, 14, 18);
                },
                secret: function() {
                    return this.x > 10 || this.y > 10;
                },
                warn: function() {
                    return "La variable <code>secret</code> vaut <code>" + JSON.stringify(secret) + "</code> et non la résultat attendu, <code>" + this.secret() + "</code>";
                },
                answer: function() {
                    return secret === this.secret();
                }
            },
            {
                title: "Effectuer une boucle",
                description: "Créer une variable nommée <code>secret</code> et lui affecter la valeur de la chaîne <code>x</code> répétée autant de fois que la valeur numérique <code>y</code> (<i>ex. 3, skate -> skateskateskate — déclarées par ce tutoriel</i>)",
                excerpt: "L'expression conditionnelle de boucle <code>for</code> effectue une opération tant que sa condition est vérifiée (<i>égale à true</i>). Cette expression est originale : elle se définit en trois parties facultatives, d'abord une initialisation, ensuite une condition, enfin une opération finale. L'initialisation est effectuée au premier pas de boucle, ensuite, tant que la condition n'est pas vérifiée, la ou les opérations sont évaluées, puis l'opération finale est évaluée à son tour.<br><br><strong>Exemple</strong> : <code>for (var i = 0; i < 5; i++) { console.log('value', i); }</code> affiche <code>0 1 2 3 4</code> dans la console du navigateur. Elle peut se lire ainsi : « Soit <code>i</code> initialisé à zéro, tant que <code>i</code> est inférieur à <code>5</code> effectuer les opérations suivantes. Après avoir effectué les opérations, ajouter <code>1</code> à <code>i</code>, puis recommencer ».",
                init: function() {
                    window.x = this.x = randomize('skate', 'rollers', 'submarine');
                    window.y = this.y = randomize(3, 5, 8, 13);
                },
                secret: function() {
                    let result = '';
                    for(let i = 0; i < this.y; i++)
                        result += this.x;
                    return result;
                },
                warn: function() {
                    return "La variable <code>secret</code> vaut <code>" + JSON.stringify(secret) + "</code> et non la résultat attendu, <code>" + this.secret() + "</code>";
                },
                answer: function() {
                    return secret === this.secret();
                }
            },
            {
                title: "Effectuer une boucle",
                description: "Créer une variable nommée <code>secret</code> et lui affecter la valeur de <code>x</code> (<i>déclarée par ce tutoriel</i>) dont tous les <code>e</code> ont été retirés.",
                excerpt: "Les condition et les boucles peuvent être imbriquées les unes dans les autres.",
                init: function() {
                    window.x = this.x = randomize('skate', 'rollers', 'submarine');
                },
                secret: function() {
                    return this.x.replace(/[e]+/g, '');
                },
                warn: function() {
                    return "La variable <code>secret</code> vaut <code>" + JSON.stringify(secret) + "</code> et non la résultat attendu, <code>" + this.secret() + "</code>";
                },
                answer: function() {
                    return secret === this.secret();
                }
            },
            {
                title: "Effectuer une boucle et une condition",
                description: "Créer une variable nommée <code>secret</code> et lui affecter la valeur de tous les nombres de 1 jusqu'à <code>x</code> (<i>déclarée par ce tutoriel</i>) sans les pairs (<i>ex. 7 -> 7 + 5 + 3 + 1</i>).",
                init: function() {
                    window.x = this.x = random(5, 9);
                },
                secret: function() {
                    let result = 0;
                    for(let i = 1; i <= this.x; i++)
                        if (i % 2 !== 0)
                            result += i;
                    return result;
                },
                warn: function() {
                    return "La variable <code>secret</code> vaut <code>" + JSON.stringify(secret) + "</code> et non la résultat attendu, <code>" + this.secret() + "</code>";
                },
                answer: function() {
                    return secret === this.secret();
                }
            },
            {
                title: "Créer un tableau",
                description: "Créer une variable nommée <code>secret</code> de type tableau et lui ajouter les valeurs de <code>x</code> et de <code>y</code> (<i>déclarées par ce tutoriel</i>).",
                excerpt: "Les tableaux représentent une liste ordonnée de variables (qu'importe leur type). La propriété <code>length</code> permet de connaitre le nombre d'éléments d'un tableau. Les crochets <code>[ ]</code> permettent d'accèder à un élément par index (<i>l'index des tableaux commence à zéro</i>).<br><br>Manipuler les tableaux par index est délicat. Ajouter un élément au début du tableau demande de déplacer tous les éléments existants et supprimer un élément de décaler les éléments suivants afin de combler le « vide » ainsi créé. Ces opérations sont falitées par les méthodes <code>push</code> (<i>ajoute un élément à la fin</i>), <code>pop</code> (<i>supprime le dernier élément</i>), <code>indexOf</code> (<i>retourne la position d'un élément ou -1 s'il n'est pas présent</i>) et bien d'autres.<br><br><strong>Exemple</strong> : <code>var items = ['paul', 'john']; items.push('ringo'); console.log(items.length, items[2]);</code> affiche la taille du tableau, <code>3</code>, et son 3iem élément, (<i>ajouté par <code>push</code></i>), c'est à dire <code>'ringo'</code>. ",
                init: function() {
                    window.x = this.x = random(1, 10);
                    window.y = this.y = random(11, 20);
                },
                secret: function() {
                    return [this.x, this.y];
                },
                warn: function() {
                    return "La variable <code>secret</code> vaut <code>" + JSON.stringify(secret) + "</code> et non la résultat attendu, <code>" + this.secret() + "</code>";
                },
                answer: function() {
                    return equals(secret, this.secret());
                }
            },
            {
                title: "Concaténer deux tableaux",
                description: "Créer une variable nommée <code>secret</code> de type tableau et lui ajouter les valeurs de <code>x</code> (un tableau également) et de <code>y</code> (<i>déclarées par ce tutoriel</i>).",
                excerpt: "La méthode <code>concat</code> permet de rassembler un tableau à tableaux autres.",
                init: function() {
                    this.x = [random(1, 10), random(1, 10)];
                    window.x = this.x.slice(0);
                    window.y = this.y = random(11, 20);
                },
                secret: function() {
                    return [].concat(this.x, this.y);
                },
                warn: function() {
                    return "La variable <code>secret</code> vaut <code>" + JSON.stringify(secret) + "</code> et non la résultat attendu, <code>" + this.secret() + "</code>";
                },
                answer: function() {
                    return equals(secret, this.secret());
                }
            },
            {
                title: "Modifier un tableau",
                description: "Créer une variable nommée <code>secret</code> de type tableau avec toutes les valeurs du tableau <code>x</code> (<i>déclarée par ce tutoriel</i>) dont chaque valeur a été doublée (<i>ex. [1, 5, 7] -> [2, 10, 14]</i>).",
                excerpt: "Les boucles <code>for</code> sont souvent utilisées pour parcourir un tableau et récupérer chacune de ses valeurs une à une.<br><br><strong>Exemple</strong> : <code>for (var i = 0; i < items.length; i++) { console.log('value', items[i]); }</code> parcourt un tableau et affiche chacune de ses valeurs.",
                init: function() {
                    this.x = [random(1, 10), random(1, 10), random(1, 10), random(1, 10)];
                    window.x = this.x.slice(0);
                },
                secret: function() {
                    return this.x.map(function(item) { return item * 2; });
                },
                warn: function() {
                    return "La variable <code>secret</code> vaut <code>" + JSON.stringify(secret) + "</code> et non la résultat attendu, <code>" + this.secret() + "</code>";
                },
                answer: function() {
                    return equals(secret, this.secret());
                }
            },
            {
                title: "Filtrer un tableau",
                description: "Créer une variable nommée <code>secret</code> de type tableau avec toutes les valeurs du tableau <code>x</code> dont la valeur de <code>y</code> a été retirée (<i>ex. 3, [1, 3, 3, 1] -> [1, 1] — déclarées par ce tutoriel</i>).",
                init: function() {
                    this.x = [random(1, 3), random(1, 3), random(1, 3), ''+random(1, 3), random(1, 3), ''+random(1, 3), random(1, 3), ''+random(1, 3)];
                    window.x = this.x.slice(0);
                    window.y = this.y = randomize.apply(null, x);
                },
                secret: function() {
                    let y = this.y;
                    return this.x.filter(function(i) { return i !== y; });
                },
                warn: function() {
                    return "La variable <code>secret</code> vaut <code>" + JSON.stringify(secret) + "</code> et non la résultat attendu, <code>" + this.secret() + "</code> (<i>attention, le tableau contient des entiers et des chaines de caractères</i>).";
                },
                answer: function() {
                    return equals(secret, this.secret());
                }
            },
            {
                title: "Réduire un tableau",
                description: "Créer une variable nommée <code>secret</code> ayant pour la valeur la somme de toutes les valeur du tableau <code>x</code> (<i>ex. [1, 5, 7] -> 13 — déclarée par ce tutoriel</i>).",
                init: function() {
                    this.x = [random(1, 10), random(1, 10), random(1, 10), random(1, 10)];
                    window.x = this.x.slice(0);
                },
                secret: function() {
                    return this.x.reduce(function(memo, value) { return memo + value; }, 0);
                },
                warn: function() {
                    return "La variable <code>secret</code> vaut <code>" + JSON.stringify(secret) + "</code> et non la résultat attendu, <code>" + this.secret() + "</code>";
                },
                answer: function() {
                    return secret === this.secret();
                }
            },
            {
                title: "Créer un dictionnaire (ou un objet littéral)",
                description: "Créer une variable nommée <code>secret</code> de type dictionnaire avec deux clés, <code>min</code> et <code>max</code>, ayant pour valeur le minimum et le maximum des valeurs <code>x</code> et <code>y</code> (<i>ex. 7, 5 -> {min: 5, max: 7} — déclarées par ce tutoriel</i>).",
                excerpt: "Les objets littéraux (<i> ou dictionnaires</i>), représentent une suite de paires clé - valeur séparées par une virgule. Chacune des valeurs ainsi listées peut être d'une type primitif ou composite.<br><br><strong>Exemple</strong> : <code>var obj = { age: 27, name: 'paul' }</code> déclare un objet littéral avec deux clés, la première ayant pour valeur un nombre, la seconde, une chaine de caractères. Ainsi <code>obj.age</code> retourne <code>27</code> et <code>obj.name</code> retourne <code>'paul'</code>. Ces valeurs peuvent être modifiées comme elles sont accédées, <code>obj.age = 32</code>.",
                init: function() {
                    window.x = this.x = random(1, 50);
                    window.y = this.y = random(1, 50);
                },
                secret: function() {
                    return {min: Math.min(this.x, this.y), max: Math.max(this.x, this.y)};
                },
                warn: function() {
                    return "La variable <code>secret</code> vaut <code>" + JSON.stringify(secret) + "</code> et non la résultat attendu, <code>" + JSON.stringify(this.secret()) + "</code>";
                },
                answer: function() {
                    return equals(secret, this.secret());
                }
            },
            {
                title: "Créer un dictionnaire",
                description: "Créer une variable nommée <code>secret</code> de type dictionnaire avec deux clés, <code>min</code> et <code>max</code>, ayant pour valeur le minimum et le maximum des dictionnaires <code>x</code> et <code>y</code> (<i>déclarées par ce tutoriel</i>) ayant chacun une clé <code>min</code> et <code>max</code> (<i>ex. {min: 1, max: 7}, {min: 4, max: 12} -> {min: 1, max: 12}</i>).",
                init: function() {
                    window.x = this.x = {min: random(1, 24), max: random(25, 40)};
                    window.y = this.y = {min: random(1, 24), max: random(25, 40)};
                },
                secret: function() {
                    return {min: Math.min(this.x.min, this.y.min), max: Math.max(this.x.max, this.y.max)};
                },
                warn: function() {
                    return "La variable <code>secret</code> vaut <code>" + JSON.stringify(secret) + "</code> et non la résultat attendu, <code>" + JSON.stringify(this.secret()) + "</code>";
                },
                answer: function() {
                    return equals(secret, this.secret());
                }
            },
            {
                title: "Filter un dictionnaire",
                description: "Créer une variable nommée <code>secret</code> de type dictionnaire avec les clés de <code>x</code> dont les clés égale à la valeur de <code>y</code> ont été retirées (<i>ex. 2, {a: 1, b: 2} -> {a: 1} — déclarées par ce tutoriel</i>).",
                init: function() {
                    window.x = this.x = {a: random(1, 3), b: random(1, 3), c: random(1, 3), d: random(1, 3), e: random(1, 3), f: random(1, 3)};
                    window.y = this.y = randomize(this.x.a, this.x.b, this.x.c, this.x.d, this.x.e, this.x.f);
                },
                secret: function() {
                    let result = {};
                    Object.keys(this.x).forEach(function(key) {
                        if (this.x[key] !== this.y) result[key] = this.x[key];
                    }.bind(this));
                    return result;
                },
                warn: function() {
                    return "La variable <code>secret</code> vaut <code>" + JSON.stringify(secret) + "</code> et non la résultat attendu, <code>" + JSON.stringify(this.secret()) + "</code>";
                },
                answer: function() {
                    return equals(secret, this.secret());
                }
            }
        ]
    }, {
        title: "Le DOM",
        description: "Les fonctionnalités principales de JavaScript dans le navigateur sont d'écouter les actions utilisateur et de modifier dynamiquement la page. Pour ce faire, il propose une structure arborescente, le DOM (<i>Document Object Model</i>), représentant le contenu de la page accessible via la variable globale <code>document</code>.<br><br>Ce chapitre présente les accès aux noeuds du DOM (<i>à l'aide de sélecteurs CSS</i>) et les écouteurs d'événements (<i>comme les clics ou les appuis de touches</i>).",
        color: "yellow",
        steps: [
            {
                title: "Sélectionner un élément",
                description: "Ajouter la classe <code>cadmiumyellow</code> au premier <code>li</code> contenu dans <code>ul.board</code>.",
                excerpt: "La méthode <code>document.querySelector</code> peut être utilisée avec un sélecteur css pour récupérer un élément. Cet élément dispose d'un attribut <code>classList</code> qui permet de modifier ses classes css.<br><br><strong>Exemple</strong> : <code>document.querySelector('div').classList.add('visible');</code> ajouter la classe <code>visible</code> au premier <code>div</code> de la page.",
                dom: function() {
                    return board.bind(board, cartman);
                },
                answer: function() {
                    let li = document.querySelector('.board li');
                    return li.classList.contains('cadmiumyellow');
                }
            },
            {
                title: "Sélectionner plusieurs éléments",
                description: "Supprimer la classe <code>braken</code> des éléments qui la possède, et remplacer la par <code>candyapplered</code>.",
                excerpt: "La méthode <code>document.querySelectorAll</code> peut être utilisée pour récupérer une liste d'éléments. Ensuite, il est nécessaire d'effectuer une boucle <code>for</code> pour parcourir chacun des éléments.",
                dom: function() {
                    return board.bind(board, cartman);
                },
                answer: function() {
                    let braken = document.querySelectorAll('.board li.braken');
                    let candyapplered = document.querySelectorAll('.board li.candyapplered');
                    return braken.length === 0 && candyapplered.length === 10;
                }
            },
            {
                title: "Écouter un événement",
                description: "Ajouter un écouteur d'événement sur le premier élément doté de la classe <code>cadmiumyellow</code>, et, au clic, remplacer cette classe par <code>bondiblue</code>.",
                excerpt: "La méthode <code>addEventListener</code> peut être utilisée sur un élément pour l'abonner aux événements utilisateur comme <code>click</code>.<br><br><strong>Exemple</strong> : <code>document.querySelector('div').addEventListener('click', function() { console.log('clicked'); });</code> ajoute un écouteur sur le premier <code>div</code> de la page et affiche <code>'clicked'</code> dans la console à chaque clic sur celui-ci.",
                dom: function() {
                    return board.bind(board, cartman);
                },
                answer: function() {
                    let li = document.querySelector('.board li.cadmiumyellow');
                    let basic = li.className === 'cadmiumyellow';
                    li.click();
                    return basic && li.className === 'bondiblue';
                }
            },
            {
                title: "Écouter un événement et boucle",
                description: "Ajouter un écouteur d'événement sur le premier élément doté de la classe <code>candyapplered</code>, et, au clic, remplacer la classe de tous les <code>li</code> de <code>ul.board</code> par <code>candyapplered</code>.",
                dom: function() {
                    return board.bind(board, cartman);
                },
                answer: function() {
                    let li = document.querySelector('.board li.candyapplered');
                    li.click();
                    return 16 === document.querySelectorAll('.board li.candyapplered').length;
                }
            },
            {
                title: "Écouter plusieurs événements",
                description: "Ajouter un écouteur d'événement sur tous les éléments dotés de la classe <code>champagne</code>, et, au clic, remplacer cette classe par <code>braken</code>.",
                excerpt: "Le code déclaré dans la fonction d'un écouteur d'événement n'est excuté par le navigateur qu'on moment où l'événement se produit. Cela pose problème avec les boucles car elles modifient les variables <code>i</code> & co. et la valeur du code dans l'écouteur d'événement se retrouve être la dernière positionnée par la boucle.<br><br>Pour éviter cela, il est possible d'utiliser <code>this</code> dasn l'écouteur d'événement (<i>qui correspond à l'élément qui a été cliqué</i>) ou de déclarer toutes les variables de la boucles avec <code>let name</code> au lieu de <code>var name</code> (<i>leur portée est ainsi limitée à la boucle</i>) ou encore de créer une fonction qui encapsule le code déclenché par l'événement.<br><br>Ce problème tient à la portée des variables déclarées avec <code>var</code> qui est locale à la fonction qui l'encapsule, et non à la boucle qui l'encapsule.",
                dom: function() {
                    return board.bind(board, cartman);
                },
                answer: function() {
                    let lis = document.querySelectorAll('.board li.champagne');
                    let braken = document.querySelectorAll('.board li.braken');
                    let basic = lis.length === 2 && braken.length === 2;

                    for (let i = 0; i < lis.length; i++)
                        lis[i].click();

                    braken = document.querySelectorAll('.board li.braken');
                    return basic && braken.length === 4;
                }
            },
            {
                title: "Écouter un événement",
                description: "Ajouter un écouteur d'événement sur le premier élément doté de la classe <code>braken</code> et le premier doté de la classe <code>champagne</code>, et, au clic sur l'un des deux, intervertir leurs classes.",
                excerpt: "Lorsque du code se retrouve dupliqué, il est possible de le rassembler au sein d'une fonction et d'appeller celle-ci plusieurs fois. Le mot clé <code>function</code> permet de déclarer un sous programme qui peut être appelé par du code externe (<i>ou s'appeller elle-même, en cas d'appels récursifs</i>). Comme une boucle conditionnelle, une fonction est composée d'une liste d'opérations (<i>délimitées entre accolades</i>), il est possible de lui fournir des arguments et elle peut retourner une valeur avec le mot clé <code>return</code>. Une fonction est variables comme les autres.<br><br><strong>Exemple</strong> : <code>var double = function (value) { return value * 2; }</code> crée une fonction qui retourne le double d'un nombre. utilisée ainsi <code>double(12)</code> elle retourne <code>24</code>.",
                dom: function() {
                    return board.bind(board, kenny);
                },
                answer: function() {
                    let lib = document.querySelector('.board li.braken');
                    let lic = document.querySelector('.board li.champagne');

                    let basic = true
                    lib.click();
                    basic = basic && lib.className === 'champagne' && lic.className === 'braken';
                    lic.click();
                    basic = basic && lib.className === 'braken' && lic.className === 'champagne';
                    lic.click();
                    basic = basic && lib.className === 'champagne' && lic.className === 'braken';
                    if (basic) {
                        for (let i = 0; i < 20; i ++)
                            setTimeout(function() { lic.click(); }, 100 * i);
                    }
                    return basic;
                }
            },
            {
                title: "Mémoriser un état",
                description: "Ajouter un écouteur d'événement sur le premier élément doté de la classe <code>champagne</code>, et, après 3 clics répétés sur celui-ci, remplacer sa classe par <code>braken</code>.",
                excerpt: "Utiliser une variable d'état est souvent plus pratique que sauvegarder des données dans le DOM.",
                dom: function() {
                    return board.bind(board, kenny);
                },
                answer: function() {
                    let li = document.querySelector('.board li.champagne');

                    let basic = true
                    li.click();
                    basic = basic && li.className === 'champagne';
                    li.click();
                    basic = basic && li.className === 'champagne';
                    li.click();
                    basic = basic && li.className === 'braken';
                    li.click();
                    basic = basic && li.className === 'braken';
                    return basic;
                }
            },
            {
                title: "Mémoriser un état",
                description: "Ajouter un écouteur d'événement sur tous les éléments dotés de la classe <code>braken</code>, et, après 3 clics répétés sur n'importe lequel d'entre eux, remplacer sa classe par <code>champagne</code>.",
                dom: function() {
                    return board.bind(board, kenny);
                },
                answer: function() {
                    let lis = document.querySelectorAll('.board li.braken');

                    let basic = true;
                    basic = basic && lis[0].className === 'braken';
                    lis[0].click();
                    lis[0].click();
                    lis[0].click();
                    return lis[0].className === 'champagne';
                }
            },
            {
                title: "Ajout d'éléménts à la fin",
                description: "Ajouter 4 <code>li</code> à la suite des <code>li</code> contenus par <code>ul.board</code> avec les deux du milieu dotés de la classe <code>darkgreen</code>.",
                excerpt: "L'attribut <code>innerHTML</code> des éléments du DOM permet de modifier leur contenu.<br><br><strong>Exemple</strong> : <code>document.querySelector('div').innerHTML = '&lt;ul&gt;&lt;li&gt;paul&lt;/li&gt;&lt;li&gt;john&lt;/li&gt;&lt;/ul&gt;';</code> ajoute un <code>ul</code> avec deux <code>li</code> au premier <code>div</code> de la page.",
                dom: function() {
                    return board.bind(board, kyle.slice(0, 12));
                },
                answer: function() {
                    let basic = true;
                    let lis = document.querySelectorAll('.board li');
                    basic = basic && 16 === lis.length;
                    kyle.forEach(function(value, i) {
                        if (i === 12 || i === 15)
                            basic = basic && lis[i].className === '';
                        if (i === 13 || i === 14)
                            basic = basic && lis[i].classList.contains('darkgreen')
                    });
                    return basic;
                }
            },
            {
                title: "Ajout d'éléménts au milieu",
                description: "Ajouter 4 <code>li</code> après le huitième <code>li</code> de <code>ul.board</code> tous dotés de la classe <code>safetyorange</code>.",
                excerpt: "La méthode <code>insertAdjacentHTML</code>, plus rarement utilisée, permet d'insérer du texte à une position donné dans un élément.",
                dom: function() {
                    return board.bind(board, kyle.slice(0, 8).concat(kyle.slice(12, 16)));
                },
                answer: function() {
                    let basic = true;
                    let lis = document.querySelectorAll('.board li');
                    basic = basic && 16 === lis.length;
                    kyle.forEach(function(value, i) {
                        if (i >= 8 && i <= 11)
                            basic = basic && lis[i].classList.contains('safetyorange')
                    });
                    return basic;
                }
            },
            {
                title: "Inverser deux éléménts",
                description: "Mémoriser lorsqu'un <code>li</code> de <code>ul.board</code> est cliqué, et, lorsqu'un second l'est à son tour, intervertir les classes de ces élements.",
                dom: function() {
                    return board.bind(board, kyle);
                },
                answer: function() {
                    let basic = true;
                    let lis = document.querySelectorAll('.board li');
                    lis[0].click();
                    lis[1].click();
                    lis[1].click();
                    lis[2].click();
                    kyle.forEach(function(value, i) {
                        if (i === 0 || i === 1)
                            basic = basic && lis[i].classList.contains('islamicgreen');
                        if (i === 2 || i === 3)
                            basic = basic && lis[i].classList.contains('kellygreen');
                    });
                    return basic;
                }
            },
            {
                title: "Manipuler les attributs data-*",
                description: "À chaque clic sur un <code>li</code> de <code>ul.board</code>, ajouter un attribut <code>data-value</code> sur cet élément avec le nombre d'éléments sélectionnés jusque là.<br><br>Un élément ne peut être sélectionné deux fois.",
                dom: function() {
                    return board.bind(board, kyle);
                },
                answer: function() {
                    let lis = document.querySelectorAll('.board li');
                    lis[2].click();
                    lis[4].click();
                    lis[6].click();
                    lis[4].click();

                    return lis[2].dataset.value === "0" &&
                        lis[4].dataset.value === "1" &&
                        lis[6].dataset.value === "2";
                }
            }
        ]
    }, {
        title: "Composant | Todolist",
        description: "Pour faciliter la réalisation d'applications et leur maintenance, plusieurs approches MV* (<i>modèle, vue & co</i>) ont vu le jour ces dernières années. Un modèle stocke l'état de l'application (<i>ex. les articles dans un panier</i>). Les vues affichent les informations issues d'un ou plusieurs modèles, modifient ceux-ci, et se mettent à jour en fonction.<br><br>Ce chapitre présente la réalisation d'une liste de tâches pas à pas. Il propose dans un premier temps d'écouter le DOM et de le modifier de façon classique, puis, dans un second temps, d'utiliser une approche MV*.",
        color: "violet",
        steps: [
            {
                title: "Ajouter un todo",
                description: "Ajouter un <code>li</code> au <code>.todos ul</code> existant à chaque appui sur entrée dans le champ de formulaire. Ce nouveau <code>li</code> à pour texte la valeur saisie dans le champ de formulaire.",
                excerpt: "Un écouteur d'événement reçoit en premier paramètre l'événement qui l'a déclenché. s'il s'agit d'un événement clavier <code>keypress</code> celui indique via <code>event.keyCode</code> quelle touche a été saisie, et via <code>event.target.value</code> quelle est la valeur actuelle du champ de formulaire.<br><br><strong>Exemple</strong> : <code>document.querySelector('input').addEventListener('keypress', function(event) { console.log(event.keyCode, event.target.value); });</code> affiche ces deux informations à chaque saisie dans le premier <code>input</code> de la page.",
                dom: function() {
                    return form.bind(form);
                },
                answer: function() {
                    let input = document.querySelector('input');

                    input.value = 'apple';
                    keypress(input, 13);

                    let lis = document.querySelectorAll('.todos ul li');

                    let basic = true;
                    basic = basic && (lis.length === 1);
                    basic = basic && elContains(lis[0], 'apple');
                    return basic;
                }
            },
            {
                title: "Ajouter plusieurs todos",
                description: "Si le champ de formulaire est vide, aucun <code>li</code> ne doit être créé. Et, losqu'un <code>li</code> est créé, le champ de formulaire doit être vidé.",
                dom: function() {
                    return form.bind(form);
                },
                answer: function() {
                    let input = document.querySelector('input');
                    input.value = '';
                    keypress(input, 13);

                    input.value = 'apple';
                    keypress(input, 13);

                    input.value = 'pear';
                    keypress(input, 13);

                    let lis = document.querySelectorAll('.todos ul li');

                    let basic = true;
                    basic = basic && !input.value;
                    basic = basic && (lis.length === 2);
                    basic = basic && elContains(lis[0], 'apple');
                    basic = basic && elContains(lis[1], 'pear');
                    return basic;
                }
            },
            {
                title: "Supprimer des todos",
                description: "Lorsqu'un <code>li</code> est ajouté au <code>.todos ul</code> existant, son texte est préfixé par <code>&lt;i class=\"remove icon\"&gt;&lt;/i&gt;</code>. Cette balise fait apparaitre une croix devant son nom. Au clic sur cette croix, le <code>li</code> doit être supprimé.",
                excerpt: "À la création d'un élément dans le DOM, il est possible d'ajouter un écouteur d'événement sur un de ses sous éléments, ou sur lui même.",
                dom: function() {
                    return form.bind(form);
                },
                answer: function() {
                    let input = document.querySelector('input');
                    input.value = 'apple';
                    keypress(input, 13);

                    input.value = 'pear';
                    keypress(input, 13);

                    let remove = document.querySelector('.todos ul .remove.icon');
                    remove.click();

                    let lis = document.querySelectorAll('.todos ul li');

                    let basic = true;
                    basic = basic && (lis.length === 1);
                    basic = basic && elContains(lis[0], 'pear');
                    return basic;
                }
            },
            {
                title: "Cocher les todos",
                description: "Lorsqu'un <code>li</code> est cliqué, la classe <code>done</code> doit lui être ajoutée. S'il est cliqué de nouveau, cette classe est supprimée.",
                dom: function() {
                    return form.bind(form);
                },
                answer: function() {
                    let input = document.querySelector('input');
                    input.value = 'apple';
                    keypress(input, 13);

                    input.value = 'pear';
                    keypress(input, 13);

                    let lis = document.querySelectorAll('.todos ul li');

                    let basic = true;
                    basic = basic && (lis.length === 2);
                    lis[0].click(); lis[0].click(); lis[0].click();
                    lis[1].click(); lis[1].click();

                    lis = document.querySelectorAll('.todos ul li');
                    basic = basic && elContains(lis[0], 'apple');
                    basic = basic && elContains(lis[1], 'pear');
                    basic = basic && lis[0].classList.contains('done');
                    basic = basic && !lis[1].classList.contains('done');
                    return basic;
                }
            },
            {
                title: "Séparer le modèle de la vue",
                description: "Créer une variable <code>todos</code> pour stocker l'état du composant (<i>combien d'éléments, lesquels sont cochés, etc</i>). À chaque modification de cette variable, appeller une méthode <code>render</code> charger de mettre à jour l'affichage.",
                excerpt: "Au lieu d'ajouter directement les <code>li</code> au DOM, créer un tableau <code>todos</code> et une méthode <code>render</code>. À chaque appui sur entrée dans le champ de formulaire, ajouter un object <code>{name: event.target.value, done: false}</code> au tableau <code>todos</code> et déclencher la méthode <code>render</code>. Le rôle de cette méthode est de vider le contenu du <code>ul</code> à chaque fois, et de parcourir le tableau <code>todos</code> afin de générer autant de <code>li</code> qu'il y a d'éléments dans le tableau. <br><br>Au lieu de modifier le DOM lors des événements (<i>clic sur la croix ou clic sur le nom du todo</i>), c'est l'élément du tableau qui est modifié et la méthode <code>render</code> qui est appellée de nouveau. Ce découpage sépare le modèle (<i>les données</i>) de la vue (<i>l'affichage</i>) et va simplifier les opérations suivantes. Supprimer et afficher de nouveaux tous les éléments n'est pas coûteux en terme de performance, tant que leur nombre n'est pas très grand.",
                dom: function() {
                    return form.bind(form);
                },
                answer: function() {
                    let input = document.querySelector('input');
                    input.value = 'apple';
                    keypress(input, 13);

                    input.value = 'pear';
                    keypress(input, 13);

                    let basic = true;
                    let lis = document.querySelectorAll('.todos ul li');
                    basic = basic && (lis.length === 2);

                    var ul = document.querySelector('.todos ul');
                    ul.innerHTML += '<li class="item done"><i class="remove icon"></i>banana</li>';

                    render && render();

                    lis = document.querySelectorAll('.todos ul li');
                    basic = basic && (lis.length === 2);
                    return basic;
                }
            },
            {
                title: "Compter les todos",
                description: "À chaque création d'un todo, le texte de <code>.filter-todo</code> doit afficher le nombre total de todo non cochés (<i>sans le classe <code>done</code></i>). Le texte de <code>.filter-done</code> affiche quant à lui, le nombre total de todo cochés (<i>avec la classe <code>done</code></i>). Penser au pluriel pour « 0 fait », « 1 fait » et « 2 faits ».",
                dom: function() {
                    return form.bind(form);
                },
                answer: function() {
                    let input = document.querySelector('input');
                    input.value = 'apple';
                    keypress(input, 13);

                    input.value = 'pear';
                    keypress(input, 13);

                    let lis = document.querySelectorAll('.todos ul li');
                    let todoCount = document.querySelector('.filter-todo');
                    let doneCount = document.querySelector('.filter-done');

                    let basic = true;
                    basic = basic && elContains(todoCount, '2 à faire');
                    basic = basic && elContains(doneCount, '0 fait');
                    lis[0].click();
                    lis = document.querySelectorAll('.todos ul li');
                    basic = basic && elContains(todoCount, '1 à faire');
                    basic = basic && elContains(doneCount, '1 fait');
                    lis[1].click();
                    lis = document.querySelectorAll('.todos ul li');
                    basic = basic && elContains(todoCount, '0 à faire');
                    basic = basic && elContains(doneCount, '2 faits');
                    return basic;
                }
            },
            {
                title: "Filtrer les todos",
                description: "Au clic sur <code>.filter-done</code> cet élément récupère la classe <code>active</code> et seuls les todos terminés sont affichés. Idem pour <code>.filter-todo</code>. Seul un de ces deux boutons peut être actif à la fois. Cliquer sur un bouton actif le désactive (<i>et affiche ainsi tous les todos</i>). Plutôt que se baser sur le DOM pour savoir quel filtre est activé, utiliser une variable à 3 états, et modifier la méthode <code>render</code> pour la mise à jour de la classe <code>active</code> sur les boutons.",
                dom: function() {
                    return form.bind(form);
                },
                answer: function() {
                    let input = document.querySelector('input');
                    input.value = 'apple';
                    keypress(input, 13);

                    input.value = 'pear';
                    keypress(input, 13);

                    input.value = 'banana';
                    keypress(input, 13);

                    let lis = document.querySelectorAll('.todos ul li');
                    let todoCount = document.querySelector('.filter-todo');
                    let doneCount = document.querySelector('.filter-done');

                    lis[1].click();

                    let basic = true;
                    basic = basic && (lis.length === 3);
                    basic = basic && elContains(todoCount, '2 à faire');
                    basic = basic && elContains(doneCount, '1 fait');

                    todoCount.click();
                    lis = document.querySelectorAll('.todos ul li');
                    basic = basic && (lis.length === 2);

                    todoCount.click();
                    lis = document.querySelectorAll('.todos ul li');
                    basic = basic && (lis.length === 3);

                    doneCount.click();
                    lis = document.querySelectorAll('.todos ul li');
                    basic = basic && (lis.length === 1);
                    basic = basic && elContains(lis[0], 'pear');
                    basic = basic && elContains(todoCount, '2 à faire');
                    basic = basic && elContains(doneCount, '1 fait');

                    return basic;
                }
            }
        ]
    } /*, {
        title: "Librairies",
        description: "Google Maps, Stripe, jQuery, moment, etc.",
        color: "red",
        steps: [

        ]
    }, {
        title: "Ajax",
        description: "Appels asynchrones serveur, REST, Promesses, etc.",
        color: "grey",
        steps: [

        ]
    }, {
        title: "Composants",
        description: "Carousel, Affix, etc.",
        color: "orange",
        steps: [

        ]
    }, {
        title: "Super pouvoirs du navigateur",
        description: "Géoloc, storage, canvas, etc.",
        color: "pink",
        steps: [

        ]
    }, {
        title: "Applications",
        description: "React, Vue, Backbone et Webpack",
        color: "olive",
        steps: [

        ]
    }*/
];

let digest = function(el, data, methods) {
    let completion = data.completion;

    let enter = methods.enter;

    return {
        render: function() {
            el.innerHTML = `
            <div class="digest">
                <h1 class="ui grey header">JavaScript</h1>
                <h3 class="ui grey header">La langage du web</h3>
                <div class="ui stackable two column grid"></div>
            </div>`;

            let grid = el.querySelector('.grid');

            for (let chapter = 0; chapter < chapters.length; chapter++) {
                let chapterContent = chapters[chapter];
                let div = document.createElement('div');
                div.className = 'column';

                let lis = '';
                for (let step = 0; step < chapterContent.steps.length; step++) {
                    let className = this.methods.isDone(step + 1, chapter + 1) ? 'complete' : '';
                    lis += `<li class="${className}"></li>`;
                }

                div.innerHTML = `
                <div class="ui fluid card h-colored h-${chapterContent.color}">
                    <div class="content">
                        <ul>${lis}</ul>
                    </div>
                    <div class="content">
                        <a class="header" data-hook="enter">${chapterContent.title}</a>
                        <div class="description">${chapterContent.description}</div>
                    </div>
                    <div class="extra content">
                        <button class="ui ${chapterContent.color} button" data-hook="enter">Parcourir</button>
                    </div>
                </div>`;

                let enters = div.querySelectorAll('[data-hook=enter]');
                for (let i = 0; i < enters.length; i++) {
                    enters[i].addEventListener('click', function(event) {
                        event.preventDefault();
                        enter(chapter + 1);
                    });
                }

                grid.appendChild(div);
            }
        },
        methods: {
            isDone: function(step, chapter) {
                return completion[chapter] >= step;
            }
        }
    }
};

let stepper = function(el, data, methods) {
    let completion = data.completion;
    let chapter = data.chapter;
    let step = data.step;

    let leave = methods.leave;
    let jump = methods.jump;
    let completed = methods.completed;
    let nextChapter = methods.nextChapter;
    let nextStep = methods.nextStep;

    let chapterContent = chapters[chapter - 1];
    let stepContent = chapters[chapter - 1].steps[step - 1];

    return {
        render: function() {
            let excerptHidden = !stepContent.excerpt ? 'hidden' : '';
            let labelNext = !this.methods.isLast(step) ? 'Étape suivante' : (!this.methods.isLatest(chapter, step) ? 'Chapitre suivant' : 'Chapitres');

            let lis = '';
            for (let _step = 0; _step < chapterContent.steps.length; _step++) {
                let className = '';
                className += this.methods.isDone(_step + 1, chapter + 1) ? 'complete ' : '';
                className += this.methods.isActive(_step + 1, chapter + 1) ? 'active ' : '';
                lis += `<li class="${className}"></li>`;
            }

            el.innerHTML = `
            <div class="stepper">
                <h3 class="ui grey header"><a href="" data-hook="leave"><i class="arrow left icon"></i>${chapterContent.title}</a></h3>

                <div class="ui stackable one column grid">
                    <div class="column">
                        <div class="ui fluid card h-colored h-${chapterContent.color}">
                            <div class="content">
                                <ul>${lis}</ul>
                            </div>
                            <div class="content">
                                <div class="header">${stepContent.title}</div>
                                <div class="description">${stepContent.description}</div>
                                <div class="dom" data-hook="dom"></div>
                                <div class="ui piled segment ${chapterContent.color} ${excerptHidden}">
                                    <h4 class="ui header">À propos</h4>
                                    <p>${stepContent.excerpt}</p>
                                </div>
                            </div>
                            <div class="extra content">
                                <div class="ui stackable two column grid">
                                    <div class="column">
                                        <span class="hidden" data-hook="error"><i class="help circle outline icon"></i><span data-hook="error-label"></span></span>
                                    </div>
                                    <div class="column">
                                        <button class="ui right labeled right floated icon ${chapterContent.color} disabled button" data-hook="next">
                                            <i class="right arrow icon"></i>
                                            <span>${labelNext}</span>
                                        </button>
                                        <button class="ui right floated ${chapterContent.color} button" data-hook="validate">Vérifier</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

            this.methods.renderDom.call(this);

            el.querySelector('[data-hook=leave]').addEventListener('click', function(event) {
                event.preventDefault();
                leave();
            });

            el.querySelector('[data-hook=next]').addEventListener('click', function() {
                if (this.methods.isLatest(chapter, step))
                    leave();
                else if (this.methods.isLast(step))
                    nextChapter();
                else
                    nextStep();
            }.bind(this));

            el.querySelector('[data-hook=validate]').addEventListener('click', function() {
                this.methods.validate.call(this);
            }.bind(this));

            lis = el.querySelectorAll('ul li');
            for (let _step = 0; _step < lis.length; _step++) {
                lis[_step].addEventListener('click', function() {
                    if (_step + 1 <= completion[chapter] + 1)
                        jump(_step + 1);
                });
            }
        },
        methods: {
            isDone: function(_step) {
                return completion[chapter] >= _step;
            },
            isActive: function(_step) {
                return step === _step;
            },
            isLast: function(_step) {
                return chapterContent.steps.length === _step;
            },
            isLatest: function(_chapter, _step) {
                return chapterContent.steps.length === _step && chapters.length === _chapter;
            },
            validate: function() {
                this.methods.renderDom.call(this, true);

                let complete = false;
                try {
                    complete = stepContent.answer();
                } catch (err) {
                    err.stack = null;
                    console.error(err);
                };

                el.querySelector('[data-hook=next]').classList.toggle('disabled', !complete);
                el.querySelector('[data-hook=error]').classList.toggle('hidden', complete);
                if (!complete)
                    el.querySelector('[data-hook=error-label]').innerHTML = this.methods.warn();

                if (complete && completion[chapter] <= step)
                    completed(chapter, step);

                this.methods.renderDom.call(this);
            },
            renderDom: function(noWarning) {
                if (stepContent.init)
                    stepContent.init();
                if (stepContent.dom)
                    document.querySelector('[data-hook=dom]').innerHTML = stepContent.dom()();
                this.methods.reload(noWarning);
            },
            warn: function() {
                let warning = 'Réponse incorrecte';
                if (typeof stepContent.warn === "function") {
                    try {
                        warning = stepContent.warn();
                    } catch (err) {
                        warning = 'Erreur navigateur : ' + err.message;
                    };
                } else if (stepContent.warn) {
                    warning = stepContent.warn;
                }
                return warning;
            },
            reload: function(noWarning) {
                let reload = document.head.querySelector('#reload');
                if (reload)
                    reload.remove();

                var code = document.querySelector('#code');
                if (code) {
                    let head = document.head;
                    let script = document.createElement('script');
                    script.id = 'reload';
                    script.type = 'text/javascript';
                    let content = code.innerHTML
                    if (noWarning)
                        content = `try { ${content} } catch (err) {};`;
                    else
                        content = `try { ${content} } catch (err) { err.stack = null; console.error(err); };`;
                    script.innerHTML = content;
                    head.appendChild(script);
                }
            }
        }
    }
}

let app = {
    el: '#app',
    data: {
        chapter: null,
        step: null,
        digest: true,
        completion: {
            1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0
        }
    },
    render: function() {
        let methods = {};
        for (let key in this.methods)
            methods[key] = this.methods[key].bind(this);

        let view = document.querySelector(this.el).querySelector('[data-hook=view]');
        if (this.data.digest)
            digest(view, this.data, methods).render();
        else
            stepper(view, this.data, methods).render();
    },
    methods: {
        enter: function(chapter) {
            this.data.digest = false;
            this.data.chapter = chapter;
            this.data.step = Math.min(this.data.completion[chapter] + 1, chapters[chapter - 1].steps.length);

            this.methods.updateProgress.call(this);
        },
        leave: function() {
            this.data.digest = true;
            this.data.chapter = null;
            this.data.step = null;

            this.methods.updateProgress.call(this);
        },
        nextStep: function() {
            this.data.step++;

            this.methods.updateProgress.call(this);
        },
        nextChapter: function() {
            this.data.step = 1;
            this.data.chapter++;

            this.methods.enter.call(this, this.data.chapter);
        },
        jump: function(step) {
            this.data.step = step;

            this.methods.updateProgress.call(this);
        },
        completed: function(chapter, step) {
            this.data.completion[chapter] = step;
            localStorage.setItem('completion', JSON.stringify(this.data.completion));
        },
        updateProgress: function() {
            this.data.step ? localStorage.setItem('step', this.data.step) : localStorage.removeItem('step');
            this.data.chapter ?  localStorage.setItem('chapter', this.data.chapter) : localStorage.removeItem('chapter');
            this.render();
        }
    }
}

if (localStorage.getItem('completion')) {
    app.data.completion = JSON.parse(localStorage.getItem('completion'));
}
if (localStorage.getItem('chapter') && localStorage.getItem('step')) {
    app.data.chapter = +localStorage.getItem('chapter');
    app.data.step = +localStorage.getItem('step');
    app.data.digest = false;
}

app.render();