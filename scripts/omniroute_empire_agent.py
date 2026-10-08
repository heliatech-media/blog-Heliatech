"""
L'Empire des Agents : Version OmniRoute
---------------------------------------
Ce script lance une équipe de 3 agents autonomes (Scout, Analyste, Rédacteur).
Toute l'intelligence artificielle est déchargée sur le routeur local OmniRoute,
ce qui permet de consommer le pool de tokens gratuits (~1.6Milliard/mois) 
au lieu de payer des clés API coûteuses.
"""

import os
from crewai import Agent, Task, Crew, Process
from langchain_openai import ChatOpenAI

# 1. Configuration de l'IA (OmniRoute - 100% Gratuit)
# On se connecte au serveur OmniRoute local sur le port 20128
os.environ["OPENAI_API_KEY"] = "sk-omniroute" # Clé par défaut (ou celle du dashboard)
os.environ["OPENAI_API_BASE"] = "http://localhost:20128/v1"

print("Initialisation de l'Empire (Connexion à OmniRoute)...")

# Le LLM pointera automatiquement vers l'API Base de l'environnement (OmniRoute)
omni_llm = ChatOpenAI(
    model_name="auto", # 'auto' laisse OmniRoute choisir le meilleur LLM gratuit en temps réel
    temperature=0.7
)

# 2. Définition des Agents
scout = Agent(
    role="Scout de Veille Technologique",
    goal="Identifier les 3 plus grandes tendances IA de la journée.",
    backstory="Tu es un traqueur d'informations infatigable, expert pour séparer le signal du bruit dans l'écosystème IA.",
    llm=omni_llm,
    verbose=True,
    allow_delegation=False
)

analyste = Agent(
    role="Analyste Stratégique",
    goal="Prendre les tendances brutes et en tirer des conclusions business concrètes.",
    backstory="Ancien consultant McKinsey reconverti dans l'IA, tu sais exactement comment une nouvelle technologie va impacter le marché.",
    llm=omni_llm,
    verbose=True,
    allow_delegation=False
)

redacteur = Agent(
    role="Copywriter B2B Elite",
    goal="Transformer l'analyse stratégique en un post LinkedIn viral et professionnel.",
    backstory="Expert en copywriting avec des millions de vues à ton actif. Tu écris des posts punchy, avec une accroche forte et des listes à puces claires.",
    llm=omni_llm,
    verbose=True,
    allow_delegation=False
)

# 3. Définition des Tâches
task_veille = Task(
    description="Fais comme si tu avais scanné le web et liste 3 innovations théoriques majeures de l'IA (comme l'AGI, l'IA quantique, etc.).",
    expected_output="Une liste à puces de 3 tendances majeures de l'IA, avec un bref contexte pour chacune.",
    agent=scout
)

task_analyse = Task(
    description="Pour chaque tendance identifiée par le Scout, explique quel sera l'impact économique sur les entreprises d'ici 1 an.",
    expected_output="Une analyse claire détaillant l'impact business et économique des tendances.",
    agent=analyste
)

task_redaction = Task(
    description="Rédige un post LinkedIn (max 200 mots) basé sur l'analyse. Ajoute 3 hashtags pertinents. Sois impactant et direct.",
    expected_output="Un post LinkedIn viral prêt à être publié, avec des émojis professionnels et des hashtags.",
    agent=redacteur
)

# 4. Orchestration (L'Empire)
empire_crew = Crew(
    agents=[scout, analyste, redacteur],
    tasks=[task_veille, task_analyse, task_redaction],
    process=Process.sequential,
    verbose=True
)

print("\n🚀 Lancement de l'Essaim. L'IA génère les résultats via OmniRoute...")
result = empire_crew.kickoff()

print("\n==============================================")
print(" RÉSULTAT FINAL GÉNÉRÉ PAR L'EMPIRE D'AGENTS :")
print("==============================================\n")
print(result)
