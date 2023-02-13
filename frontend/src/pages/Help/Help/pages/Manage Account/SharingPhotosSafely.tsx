import CollapseItem from "../../components/CollapseItem";
import HelpHeader from "../../components/HelpHeader";
import RelatedTopics from "../../components/RelatedTopics";

const SharingPhotosSafely = () => {
  return (
    <div className="HelpArticleContainer">
      <HelpHeader text="Sharing Photos Safely" />
      <section className="helpArticle helpparagraph">
        <p className="helpTextPrimary">
          Learn how to safely share your photos.
        </p>
      </section>
      <CollapseItem
        title="Consent to Publish."
        content={
          <p className="helpTextSecondary">
            It's important to get consent from anyone who appears in your photos
            before you post them online. Even if they are in the background or
            partially visible, it's best to ask for their permission. You can do
            this by sending them a message or having a conversation in person.
            Make sure they understand where the photo will be posted and who
            will be able to see it.
          </p>
        }
      />
      <CollapseItem
        title="Geotagging. "
        content={
          <p className="helpTextSecondary">
            When you share photos online, you might be sharing more than just
            the image itself. Many smartphones automatically add location data
            to your photos, which can reveal where you are or where you've been.
            If you don't want this information to be public, you can turn off
            geotagging in your camera settings or by selecting "Remove Location"
            when you upload a photo.
          </p>
        }
      />
      <CollapseItem
        title="Sensitive Content. "
        content={
          <p className="helpTextSecondary">
            It's important to consider the content of your photos before you
            post them online. If they contain personal or sensitive information
            about yourself or others, it's best to keep them private or not
            share them at all. This includes photos of identification cards,
            financial information, or medical conditions.
          </p>
        }
      />
      <RelatedTopics
        topics={[
          { text: "Staying Safe", link: "/help/stayingsafe" },
          { text: "Reporting", link: "/help/report" },
        ]}
      />
    </div>
  );
};

export default SharingPhotosSafely;
