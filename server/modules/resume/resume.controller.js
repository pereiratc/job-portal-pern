import * as resumeService from './resume.service.js';

export async function uploadResume(req, res) {
  try {
    const file = req.file;
    const userId = req.user.userId;

    const result = await resumeService.saveResume(file, userId);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
