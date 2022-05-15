import DeleteVideoRequest from '../requests/DeleteVideo.request';

class DeleteVideoCommand {
  constructor(public readonly deleteVideoRequest: DeleteVideoRequest) {}
}

export default DeleteVideoCommand;
