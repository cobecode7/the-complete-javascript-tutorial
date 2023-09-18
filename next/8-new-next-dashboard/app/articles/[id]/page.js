import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import styles from '../../styles/single.module.css';

export default async function SingleArticlePage(context) {
  const data = await fetchData(context);

  if (!data.article) {
    // not found
    return notFound();
  }

  const article = data?.article;
  return (
    <div className={styles['container']}>
      <div className={styles['container-inner']}>
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <hr />
        <p>{article.content}</p>
        <p>{article.author}</p>
        <p>{article.keywords}</p>
        <p>{article.category}</p>
        <p>{article.createDate}</p>
        <p>{article.updateDate}</p>
      </div>
    </div>
  );
}

async function fetchData(context) {
  const { params } = context;
  const { id } = params;

  // get the domain
  const headersList = headers();
  const domain = headersList.get('host');
  const apiUrl = 'http://' + domain + '/articles/api?id=' + id;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}
