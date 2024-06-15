import { Link } from 'react-router-dom';

export const PrivacyRules = () => {
  return (
    <div className="container mx-auto max-w-5xl py-10">
      <h1 className="mb-6 text-3xl font-bold">Règles de Confidentialité</h1>

      <section className="mb-6">
        <h2 className="mb-4 text-2xl font-semibold">1. Introduction</h2>
        <p>
          Bienvenue sur l'application Checklist. Nous respectons votre vie
          privée et nous nous engageons à protéger vos informations
          personnelles. Cette politique de confidentialité explique comment nous
          recueillons, utilisons, et partageons vos informations lorsque vous
          utilisez notre Application.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-4 text-2xl font-semibold">
          2. Informations que nous collectons
        </h2>
        <p>Nous collectons et traitons les types de données suivants :</p>
        <ul className="ml-4 list-inside list-disc">
          <li>
            <span className="font-bold">Nom du compte</span> : le nom que vous
            utilisez pour créer votre compte sur l'Application.
          </li>
          <li>
            <span className="font-bold">Mot de passe</span> : le mot de passe
            que vous utilisez pour accéder à votre compte, qui est stocké de
            manière chiffrée.
          </li>
          <li>
            <span className="font-bold">Checklists</span> : les listes de tâches
            que vous créez et gérez au sein de l'Application.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-4 text-2xl font-semibold">
          3. Utilisation des informations
        </h2>
        <p>Nous n'utilisons pas vos informations.</p>
      </section>

      <section className="mb-6">
        <h2 className="mb-4 text-2xl font-semibold">
          4. Partage des informations
        </h2>
        <p>
          Nous ne partageons pas vos informations personnelles avec des tiers
          sauf dans les cas suivants :
        </p>
        <ul className="ml-4 list-inside list-disc">
          <li>
            D'après une demande spécifique de votre part et avec votre
            consentement
          </li>
          <li>Pour se conformer à une obligation légale</li>
          <li>Pour protéger nos droits et notre propriété</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-4 text-2xl font-semibold">5. Sécurité des données</h2>
        <p>
          Nous prenons des mesures raisonnables pour protéger vos informations
          personnelles contre la perte, le vol, l'utilisation abusive et l'accès
          non autorisé. Cependant, aucune méthode de transmission sur Internet
          ou de stockage électronique n'est totalement sécurisée.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-4 text-2xl font-semibold">6. Vos droits</h2>
        <p>Vous avez le droit de :</p>
        <ul className="ml-4 list-inside list-disc">
          <li>Accéder à vos informations personnelles</li>
          <li>
            Rectifier vos informations personnelles si elles sont incorrectes ou
            incomplètes
          </li>
          <li>Demander la suppression de vos informations personnelles</li>
          <li>
            Demander la limitation du traitement de vos informations
            personnelles
          </li>
          <li>Vous opposer au traitement de vos informations personnelles</li>
          <li>Demander la portabilité de vos informations personnelles</li>
        </ul>
        <p>
          Pour exercer ces droits, veuillez nous contacter à
          checklist.v2.app@gmail.com.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-4 text-2xl font-semibold">
          7. Informations collectées par nos hébergeur
        </h2>
        <p>
          Notre Application est hébergée par Hostinger et PythonAnywhere. Ils
          peuvent collecter certaines informations techniques, y compris les
          adresses IP, à des fins de sécurité et de surveillance de la
          performance des services. Pour plus de détails sur les pratiques de
          collecte de données de ces hébergeurs, veuillez consulter leur
          politique de confidentialité:{' '}
          <a
            href="https://www.hostinger.fr/politique-de-confidentialite"
            className="text-blue-500 underline">
            Hostinger
          </a>
          ,{' '}
          <a
            href="https://www.pythonanywhere.com/privacy_v2/"
            className="text-blue-500 underline">
            PythonAnywhere
          </a>
          .
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-4 text-2xl font-semibold">
          8. Modifications de cette politique de confidentialité
        </h2>
        <p>
          Nous pouvons mettre à jour cette politique de confidentialité de temps
          en temps. Nous vous informerons de tout changement en publiant la
          nouvelle politique de confidentialité sur cette page. Nous vous
          conseillons de consulter cette politique de confidentialité
          périodiquement pour toute modification.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-4 text-2xl font-semibold">9. Contact</h2>
        <p>
          Si vous avez des questions concernant cette politique de
          confidentialité, veuillez nous contacter à checklist.v2.app@gmail.com.
        </p>
      </section>
      <Link className="text-center font-bold underline" to="/">
        Retour à l'application
      </Link>
    </div>
  );
};
