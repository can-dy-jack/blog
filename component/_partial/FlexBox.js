import Image from "next/image";

function FlexBox({ imgLink, imgAlt, imgWH, title, children, styles }) {
  return (
    <div className={styles.indexinfoitem}>
      <span>
        <Image src={imgLink} alt={imgAlt} height={imgWH} width={imgWH} />
      </span>
      <div className={styles.info_head}>{title}</div>
      <p>{children}</p>
    </div>
  );
}
FlexBox.defaultProps = {
  imgWH: 300,
};

export default FlexBox;
