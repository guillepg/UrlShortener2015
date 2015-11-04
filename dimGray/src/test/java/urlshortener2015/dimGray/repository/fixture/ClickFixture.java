package urlshortener2015.dimGray.repository.fixture;

import urlshortener2015.dimGray.domain.Click;
import urlshortener2015.dimGray.domain.ShortURL;

public class ClickFixture {

	public static Click click(ShortURL su) {
		return new Click(null, su.getHash(), null, null, null, null, null, null);
	}
}
