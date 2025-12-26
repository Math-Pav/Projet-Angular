import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../../../core/models/comment.model';
import { Post } from '../../../../core/models/post.model';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-detail.component.html'
})
export class PostDetailComponent implements OnInit {
  post!: Post;
  comments: Comment[] = [];

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    const postIdParam = this.route.snapshot.paramMap.get('id');

    if (!postIdParam) {
      console.error('Post ID manquant dans l’URL');
      return;
    }

    const postId = +postIdParam;
    if (isNaN(postId) || postId <= 0) {
      console.error('Post ID invalide:', postIdParam);
      return;
    }

    this.postService.getPostById(postId).subscribe({
      next: post => {
        this.post = post;

        this.commentService.getCommentsByPost(postId).subscribe({
          next: response => this.comments = response.comments,
          error: err => console.error('Erreur lors de la récupération des commentaires', err)
        });
      },
      error: err => console.error('Erreur lors de la récupération du post', err)
    });
  }
}
