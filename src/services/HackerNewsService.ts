import { Story } from '../types/interfaces';

class HackerNewsService {
  private _apiBaseUrl = 'https://hacker-news.firebaseio.com/v0';

  private getResource = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }

    return await response.json();
  };

  public getStoriesIds = async (type = 'newstories'): Promise<number[]> => {
    const url = `${this._apiBaseUrl}/${type}.json`;

    return await this.getResource(url);
  };

  public getStoryDetails = async (id: number): Promise<Story | null> => {
    const url = `${this._apiBaseUrl}/item/${id}.json`;
    const story = await this.getResource(url);

    if (!story) {
      return null;
    }

    return {
      id: story.id,
      title: story.title,
      url: story.url,
      score: story.score,
      by: story.by,
      kids: story.kids || []
    };
  };

  public getStories = async (
    page = 1,
    pageSize = 15,
    type = 'newstories'
  ): Promise<Story[]> => {
    const ids = await this.getStoriesIds(type);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const storyIdsToFetch = ids.slice(startIndex, endIndex);

    const storiesPromises = storyIdsToFetch.map((id) =>
      this.getStoryDetails(id)
    );

    const stories = await Promise.all(storiesPromises);

    return stories.filter((story) => story !== null) as Story[];
  };
}

export default HackerNewsService;
