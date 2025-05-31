"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Rss,
  Calendar,
  Users,
  Bookmark,
  ExternalLink,
  Clock,
  MessageCircle,
} from "lucide-react";

type Props = {
  userId: string;
};

const TechInsightsTab = ({ userId }: Props) => {
  // Mock data - replace with actual API calls
  const trendingTopics = [
    { name: "AI/Machine Learning", trend: "+25%", articles: 1247 },
    { name: "React 19", trend: "+18%", articles: 892 },
    { name: "TypeScript 5.0", trend: "+15%", articles: 634 },
    { name: "Cloud Computing", trend: "+12%", articles: 2156 },
  ];

  const personalizedArticles = [
    {
      id: 1,
      title: "Advanced React Patterns You Should Know in 2024",
      source: "Dev.to",
      readTime: "8 min read",
      publishedAt: "2 hours ago",
      tags: ["React", "JavaScript", "Patterns"],
      aiReason: "Based on your React learning progress",
    },
    {
      id: 2,
      title: "Building Scalable Node.js Applications",
      source: "Medium",
      readTime: "12 min read",
      publishedAt: "5 hours ago",
      tags: ["Node.js", "Architecture", "Backend"],
      aiReason: "Matches your backend development interests",
    },
    {
      id: 3,
      title: "The Future of Web Development: Trends to Watch",
      source: "Smashing Magazine",
      readTime: "6 min read",
      publishedAt: "1 day ago",
      tags: ["Web Dev", "Trends", "Future"],
      aiReason: "Popular in your network",
    },
  ];

  const communityDiscussions = [
    {
      id: 1,
      title: "Best practices for React state management in 2024?",
      replies: 34,
      lastActive: "2 hours ago",
      tags: ["React", "State Management"],
    },
    {
      id: 2,
      title: "Career advice: Junior to Mid-level transition",
      replies: 67,
      lastActive: "1 hour ago",
      tags: ["Career", "Advice"],
    },
    {
      id: 3,
      title: "Which database to choose for a new project?",
      replies: 23,
      lastActive: "4 hours ago",
      tags: ["Database", "Architecture"],
    },
  ];

  const upcomingEvents = [
    {
      title: "React Summit 2024",
      date: "Dec 15, 2024",
      type: "Conference",
      location: "Virtual",
    },
    {
      title: "JavaScript Meetup - Advanced Patterns",
      date: "Nov 28, 2024",
      type: "Meetup",
      location: "San Francisco",
    },
    {
      title: "AWS re:Invent 2024",
      date: "Dec 2-6, 2024",
      type: "Conference",
      location: "Las Vegas",
    },
  ];

  const savedContent = [
    {
      title: "Complete Guide to TypeScript",
      type: "Article",
      saved: "3 days ago",
    },
    {
      title: "Docker Best Practices",
      type: "Tutorial",
      saved: "1 week ago",
    },
    {
      title: "System Design Interview Prep",
      type: "Course",
      saved: "2 weeks ago",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Trending Technologies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            Trending in Tech
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {trendingTopics.map((topic, index) => (
              <div
                key={index}
                className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <h4 className="font-medium text-foreground mb-2">
                  {topic.name} {userId}
                </h4>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs text-green-600">
                    {topic.trend}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {topic.articles} articles
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Personalized Articles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Rss className="h-4 w-4 text-primary" />
            </div>
            AI-Curated Articles for You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {personalizedArticles.map((article) => (
              <div
                key={article.id}
                className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-foreground flex-1 pr-4">
                    {article.title}
                  </h4>
                  <Button size="sm" variant="ghost" className="flex-shrink-0">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-sm text-blue-600 mb-2">{article.aiReason}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span>{article.source}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </div>
                  <span>•</span>
                  <span>{article.publishedAt}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Community & Events */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <MessageCircle className="h-4 w-4 text-primary" />
              </div>
              Active Discussions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {communityDiscussions.map((discussion) => (
                <div
                  key={discussion.id}
                  className="p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                >
                  <h4 className="font-medium text-foreground mb-2">
                    {discussion.title}
                  </h4>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {discussion.replies} replies
                    </div>
                    <span>{discussion.lastActive}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {discussion.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                >
                  <h4 className="font-medium text-foreground mb-2">
                    {event.title}
                  </h4>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span>{event.date}</span>
                    <Badge variant="secondary" className="text-xs">
                      {event.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {event.location}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Saved Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Bookmark className="h-4 w-4 text-primary" />
            </div>
            Saved Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {savedContent.map((content, index) => (
              <div
                key={index}
                className="p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground">
                    {content.title}
                  </h4>
                  <Button size="sm" variant="ghost" className="flex-shrink-0">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <Badge variant="outline" className="text-xs">
                    {content.type}
                  </Badge>
                  <span>Saved {content.saved}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechInsightsTab;
