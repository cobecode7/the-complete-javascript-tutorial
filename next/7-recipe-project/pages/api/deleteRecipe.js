import { deleteOne } from '../../api/recipe';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Get Token
      const token = req?.cookies?.LWNJwt;
      const { id } = req.body;
      // Send Request to the backend
      const fetchResponse = await fetch(deleteOne(id), {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const dataReturned = await fetchResponse.json();
      if (!fetchResponse.ok) {
        const { error } = dataReturned;
        const message = ` ${error?.name}: ${error?.message}`;
        res.status(401);
        res.json({ ok: false, message });
        throw new Error(message);
      }
      // success
      res.status(200);
      res.json({
        ok: true,
        message: 'The recipe got DELETED successfully.',
      });
    } catch (e) {
      console.log(e);
    }
  } else {
    res.status(405);
    res.json({ message: 'Method not Allowed' });
  }
}
