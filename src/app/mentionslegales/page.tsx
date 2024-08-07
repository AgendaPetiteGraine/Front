"use client";

import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Header from "../components/Header";
import LeftColumn from "../components/LeftColumn";

import styles from "./page.module.css";
import { saveTokenToCookie } from "@/app/utils/auth";

export default function Mentions() {
  const router = useRouter();

  return (
    <main className={styles.main}>
      <div className={styles.leftColumn}>
        <LeftColumn
          filter={null}
          setFilter={null}
          keyWords={null}
          cities={null}
          types={null}
          events={null}
          data={null}
          page="apropos"
          setToken={null}
          token={null}
        />
      </div>
      <div className={styles.rightColumn}>
        <Header />
        <div className={styles.description}>
          <h2>Mentions Légales</h2>
          <br />
          <h3>Identité</h3>
          <p>
            <strong>Nom du site web :</strong> Petite Graine
            <br />
            <strong>Adresse du site :</strong> https://www.petitegraine.org
          </p>
          <p>
            <strong>Propriétaire et responsable de publication :</strong> Sophie
            Boyer - contact@petitegraine.org
          </p>
          <p>
            <strong>Hébergement :</strong> L'hébergeur du site
            www.petitegraine.org est assuré par :
            <br />
            <strong>Netlify, Inc.</strong>
            <br />
            <ul>
              <li>2325 3rd Street, Suite 296</li>
              <li>San Francisco, CA 94107</li>
              <li>États-Unis</li>
              <li>Téléphone : +1 (415) 691-1573</li>
            </ul>
          </p>
          <p>
            <strong>Personne morale</strong>
            <br />
            Petite Graine - Association de la loi 1901 – RCS W952014781 –
            contact@petitegraine.org
          </p>
          <p>
            <strong>Conditions d’utilisation</strong>
            <br />
            L’utilisation du présent site implique l’acceptation pleine et
            entière des conditions générales d’utilisation décrites ci-après.
            Ces conditions d’utilisation sont susceptibles d’être modifiées ou
            complétées à tout moment.
          </p>
          <p>
            <strong>Informations</strong>
            <br />
            Les informations et documents du site sont présentés à titre
            indicatif, sans de caractère exhaustif, et ne peuvent engager la
            responsabilité du propriétaire du site.
            <br />
            Le propriétaire du site ne peut être tenu responsable des dommages
            directs et indirects consécutifs à l’accès au site.
          </p>
          <p>
            <strong>Interactivité</strong>
            <br />
            Les utilisateurs du site (organisateur d'événements) peuvent y
            déposer du contenu, apparaissant sur le site dans des espaces
            dédiés. Le contenu déposé reste sous la responsabilité de leurs
            auteurs, qui en assument pleinement l’entière responsabilité
            juridique.
            <br />
            Le propriétaire du site se réserve néanmoins le droit de retirer
            sans préavis et sans justification tout contenu déposé par les
            utilisateurs qui ne satisferait pas à la charte déontologique du
            site ou à la législation en vigueur.
          </p>
          <p>
            <strong>Propriété intellectuelle</strong>
            <br />
            Sauf mention contraire, tous les éléments accessibles sur le site
            (textes, images, graphismes, logo, icônes, sons, logiciels, etc.)
            restent la propriété exclusive de leurs auteurs, en ce qui concerne
            les droits de propriété intellectuelle ou les droits d’usage.
            <br />
            Toute reproduction, représentation, modification, publication,
            adaptation de tout ou partie des éléments du site, quel que soit le
            moyen ou le procédé utilisé, est interdite, sauf autorisation écrite
            préalable de l’auteur.
            <br />
            Toute exploitation non autorisée du site ou de l’un quelconque des
            éléments qu’il contient est considérée comme constitutive d’une
            contrefaçon et passible de poursuites.
            <br />
            Les marques et logos reproduits sur le site sont déposés par les
            sociétés qui en sont propriétaires.
            <br />
          </p>
          <p>
            <strong>Liens</strong>
            <br />
            Liens sortants
            <br />
            Le propriétaire du site décline toute responsabilité et n’est pas
            engagé par le référencement via des liens hypertextes, de ressources
            tierces présentes sur le réseau Internet, tant en ce qui concerne
            leur contenu que leur pertinence.
            <br />
            Liens entrants
            <br />
            Le propriétaire du site autorise les liens hypertextes vers l’une
            des pages de ce site, à condition que ceux-ci ouvrent une nouvelle
            fenêtre et soient présentés de manière non équivoque afin d’éviter :
            <br />
            <ul>
              <li>
                tout risque de confusion entre le site citant et le propriétaire
                du site
              </li>
              <li>
                ainsi que toute présentation tendancieuse, ou contraire aux lois
                en vigueur.
              </li>
            </ul>
            Le propriétaire du site se réserve le droit de demander la
            suppression d’un lien s’il estime que le site source ne respecte pas
            les règles ainsi définies.
          </p>
          <p>
            <strong>Confidentialité</strong>
            <br />
            Tout utilisateur dispose d’un droit d’accès, de rectification et
            d’opposition aux données personnelles le concernant, en effectuant
            sa demande écrite et signée, accompagnée d’une preuve d’identité.
          </p>
          <p>
            Le site ne recueille pas d’informations personnelles, et n’est pas
            assujetti à déclaration à la CNIL.
          </p>
          <strong>Politique de confidentialité :</strong>
          <p>
            Le but de cette politique de confidentialité est d'informer les
            utilisateurs de notre site des données personnelles que nous
            recueillerons ainsi que les informations suivantes, le cas échéant :
          </p>
          <ul>
            <li>Les données personnelles que nous recueillerons</li>
            <li>L’utilisation des données recueillies</li>
            <li>Qui a accès aux données recueillies</li>
            <li>Les droits des utilisateurs du site</li>
            <li>La politique de cookies du site</li>
            <li>
              Cette politique de confidentialité fonctionne parallèlement aux
              conditions générales d’utilisation de notre site.
            </li>
          </ul>
          <br />
          <h3>Lois applicables</h3>
          <p>
            Conformément au Règlement général sur la protection des données
            (RGPD), cette politique de confidentialité est conforme aux
            règlements suivants.
          </p>
          <br />
          <p>
            Les données à caractère personnel doivent être :<br />
            <ul>
              <li>
                traitées de manière licite, loyale et transparente au regard de
                la personne concernée (licéité, loyauté, transparence) ;
              </li>
              <li>
                collectées pour des finalités déterminées, explicites et
                légitimes, et ne pas être traitées ultérieurement d'une manière
                incompatible avec ces finalités;
              </li>
              <li>
                le traitement ultérieur à des fins archivistiques dans l'intérêt
                public, à des fins de recherche scientifique ou historique ou à
                des fins statistiques n'est pas considéré, conformément à
                l'article 89, paragraphe 1, comme incompatible avec les
                finalités initiales (limitation des finalités) ;
              </li>
              <li>
                adéquates, pertinentes et limitées à ce qui est nécessaire au
                regard des finalités pour lesquelles elles sont traitées
                (minimisation des données) ;
              </li>
              <li>exactes et, si nécessaire, tenues à jour;</li>
              <li>
                toutes les mesures raisonnables doivent être prises pour que les
                données à caractère personnel qui sont inexactes, eu égard aux
                finalités pour lesquelles elles sont traitées, soient effacées
                ou rectifiées sans tarder (exactitude) ;
              </li>
              <li>
                conservées sous une forme permettant l'identification des
                personnes concernées pendant une durée n'excédant pas celle
                nécessaire au regard des finalités pour lesquelles elles sont
                traitées;
              </li>
              <li>
                les données à caractère personnel peuvent être conservées pour
                des durées plus longues dans la mesure où elles seront traitées
                exclusivement à des fins archivistiques dans l'intérêt public, à
                des fins de recherche scientifique ou historique ou à des fins
                statistiques conformément à l'article 89, paragraphe 1, pour
                autant que soient mises en œuvre les mesures techniques et
                organisationnelles appropriées requises par le règlement afin de
                garantir les droits et libertés de la personne concernée
                (limitation de la conservation) ;
              </li>
              <li>
                traitées de façon à garantir une sécurité appropriée des données
                à caractère personnel, y compris la protection contre le
                traitement non autorisé ou illicite et contre la perte, la
                destruction ou les dégâts d'origine accidentelle, à l'aide de
                mesures techniques ou organisationnelles appropriées (intégrité
                et confidentialité).
              </li>
            </ul>
          </p>
          <br />
          <p>
            Le traitement n'est licite que si, et dans la mesure où, au moins
            une des conditions suivantes est remplie :<br />
            <ul>
              <li>
                la personne concernée a consenti au traitement de ses données à
                caractère personnel pour une ou plusieurs finalités spécifiques
                ;
              </li>
              <li>
                le traitement est nécessaire à l'exécution d'un contrat auquel
                la personne concernée est partie ou à l'exécution de mesures
                précontractuelles prises à la demande de celle-ci ;
              </li>
              <li>
                le traitement est nécessaire au respect d'une obligation légale
                à laquelle le responsable du traitement est soumis ;
              </li>
              <li>
                le traitement est nécessaire à la sauvegarde des intérêts vitaux
                de la personne concernée ou d'une autre personne physique ;
              </li>
              <li>
                le traitement est nécessaire à l'exécution d'une mission
                d'intérêt public ou relevant de l'exercice de l'autorité
                publique dont est investi le responsable du traitement ;
              </li>
              <li>
                le traitement est nécessaire aux fins des intérêts légitimes
                poursuivis par le responsable du traitement ou par un tiers, à
                moins que ne prévalent les intérêts ou les libertés et droits
                fondamentaux de la personne concernée qui exigent une protection
                des données à caractère personnel, notamment lorsque la personne
                concernée est un enfant.
              </li>
              <li>
                Pour les résidents de l’État de Californie, cette politique de
                confidentialité vise à se conformer à la California Consumer
                Privacy Act (CCPA). S’il y a des incohérences entre ce document
                et la CCPA, la législation de l’État s’appliquera. Si nous
                constatons des incohérences, nous modifierons notre politique
                pour nous conformer à la loi pertinente.
              </li>
            </ul>
          </p>
          <br />
          <h3>Consentement</h3>
          <br />
          <p>
            Les utilisateurs conviennent qu’en utilisant notre site, ils
            consentent aux conditions énoncées dans la présente politique de
            confidentialité et la collecte, l’utilisation et la conservation des
            données énumérées dans la présente politique.
          </p>
          <p>
            <strong>La collecte des données personnelles</strong>
            <br />
            Aucune donnée personnelle n'est collectée automatiquement.
            <br />
            Lorsque vous vous inscrivez à la newsletter, votre prénom et votre
            adresse Email sont recueillis.
            <br />
            Vous pouvez à tout moment faire la demande de vous désinscrire de la
            newsletter, auquel cas nous supprimerons ces données vous
            concernant.
          </p>
          <p>
            <strong>L'utilisation des données personnelles</strong>
            <br />
            Ces données personnelles recueillies sur notre site seront utilisées
            uniquement à l'envoi d'une newsletter mensuelle. Seul
            l'administrateur du site a accès à ces données. Elles ne seront
            divulguées à aucune tierce partie.
            <br />
            Nous nous engageons à ne pas vendre ou partager vos données avec des
            tiers, sauf dans les cas suivants :<br />
            <ul>
              <li>si la loi l'exige</li>
              <li>
                si elle est requise pour toute procédure judiciaire, pour
                prouver ou protéger nos droits légaux, à des acheteurs ou des
                acheteurs potentiels de cette société dans le cas où nous
                cherchons à la vendre la société
              </li>
              <li>
                Si vous suivez des hyperliens de notre site vers un autre site,
                veuillez noter que nous ne sommes pas responsables et n’avons
                pas de contrôle sur leurs politiques et pratiques de
                confidentialité.
              </li>
            </ul>
          </p>
          <p>
            <strong>La conservation des données personnelles</strong>
            <br />
            Nous ne conservons pas les données des utilisateurs au-delà de ce
            qui est nécessaire pour atteindre les fins pour lesquelles elles
            sont recueillies.
          </p>
          <p>
            <strong>La protection des données personnelles</strong>
            <br />
            Toutes les données stockées dans notre système sont bien sécurisées
            et ne sont accessibles qu’à l'administrateur.
            <br />
            Alors que nous prenons toutes les précautions raisonnables pour nous
            assurer que nos données d’utilisateur sont sécurisées et que les
            utilisateurs sont protégés, il reste toujours du risque de
            préjudice. L’Internet en sa totalité peut être, parfois, peu sûr et
            donc nous sommes incapables de garantir la sécurité des données des
            utilisateurs au-delà de ce qui est raisonnablement pratique.
          </p>
          <p>
            <strong>Mineurs</strong>
            <br />
            Le RGPD précise que les personnes de moins de 15 ans sont
            considérées comme des mineurs aux fins de la collecte de données.
            Les mineurs doivent avoir le consentement d’un représentant légal
            pour que leurs données soient recueillies, traitées et utilisées.
          </p>
          <p>
            <strong>Vos droits en tant qu’utilisateur</strong>
            <br />
            En vertu du RGPD, les utilisateurs ont les droits suivants en tant
            que personnes concernées :<br />
            <ul>
              <li>droit d’accès</li>
              <li>droit de rectification</li>
              <li>droit à l’effacement</li>
              <li>droit de restreindre le traitement</li>
              <li>droit à la portabilité des données</li>
              <li>droit d'objection</li>
            </ul>
            Vous trouverez de plus amples informations sur ces droits au
            chapitre 3 (art 12-23) du RGPD.
          </p>
          <p>
            <strong>
              Comment modifier, supprimer ou contester les données recueillies
            </strong>
            <br />
            Si vous souhaitez que vos renseignements soient supprimés ou
            modifiés d’une façon ou d’une autre, veuillez nous contacter à cette
            adresse : contact@petitegraine.org
          </p>
          __________
          <p>
            <strong>Modifications</strong>
            <br />
            Cette politique de confidentialité peut être modifiée à l’occasion
            afin de maintenir la conformité avec la loi et de tenir compte de
            tout changement à notre processus de collecte de données. Nous
            recommandons à nos utilisateurs de vérifier notre politique de temps
            à autre pour s’assurer qu’ils soient informés de toute mise à jour.
            Au besoin, nous pouvons informer les utilisateurs par courriel des
            changements apportés à cette politique.
          </p>
          <p>
            <strong>Contact</strong>
            <br />
            Si vous avez des questions à nous poser, n’hésitez pas à communiquer
            avec nous en utilisant ce qui suit :<br />
            contact@petitegraine.org
          </p>
          <p>
            Date d’entrée en vigueur : le 12 juin 2023
            <br />© 2002-2023, DocumentsLégaux™ (Sequiter Inc.)
          </p>
          __________
          <p>
            <strong>Politique de cookies :</strong> Ce site utilise des cookies
            pour améliorer votre expérience. Les seules informations conservées
            en cookies sont les événements que vous ajoutez en favoris. Vous
            pouvez les supprimer à tout moment, soit en les enlevant de vos
            favoris, soit en supprimant les cookies depuis votre navigateur.
          </p>
          <p>
            <strong>Crédits</strong>
            <br />
            Logo dessiné par Petite graine
            <br />
            Autres illustrations :
            <a href="http://www.freepik.com">
              <strong>Designed by Freepik</strong>
            </a>
          </p>
        </div>
        <br />
      </div>
    </main>
  );
}
